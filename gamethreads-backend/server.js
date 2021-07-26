import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
import cron from "node-cron";
import axios from "axios";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1240154",
  key: "6afaa4f9c8ed5946ac96",
  secret: "1918a426f7eb9fb8b214",
  cluster: "us2",
  useTLS: true,
});

const oddsApiKey = "a4915c49f1758c935a36ec053a0a8b84";

const nflLogo = "http://loodibee.com/wp-content/uploads/nfl-league-logo.png";
const nbaLogo =
  "http://loodibee.com/wp-content/uploads/nba-logo-transparent.png";
const nhlLogo = "http://loodibee.com/wp-content/uploads/NHL-league-logo.png";
const mlbLogo =
  "http://loodibee.com/wp-content/uploads/Major_League_Baseball_MLB_transparent_logo.png";

const sportKeys = [
  "americanfootball_nfl",
  "baseball_mlb",
  "basketball_nba",
  "icehockey_nhl",
];

const sportsLogos = [nflLogo, mlbLogo, nbaLogo, nhlLogo];

const oddsApiRequests = sportKeys.map((sport) =>
  axios.get(
    `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${oddsApiKey}&regions=us&markets=h2h,spreads&oddsFormat=american`
  )
);

const defaultChatList = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Olympic_rings_square.svg",
    title: "Tokyo Olympic Games",
    subtitle: "General discussion",
  },
  {
    img: nflLogo,
    title: "NFL",
    subtitle: "General discussion",
  },
  {
    img: nbaLogo,
    title: "NBA",
    subtitle: "General discussion",
  },
  {
    img: nhlLogo,
    title: "NHL",
    subtitle: "General discussion",
  },
  {
    img: mlbLogo,
    title: "MLB",
    subtitle: "General discussion",
  },
];

let gamesChatList = [];

const updateGameChatList = () => {
  let newGamesChatList = [];
  axios
    .all(oddsApiRequests)
    .then(
      axios.spread((...responses) => {
        const responseData = responses.map((res) => res.data);

        for (let i = 0; i < responseData.length; i++) {
          const gamesForSport = responseData[i].map((game) => ({
            img: sportsLogos[sportKeys.indexOf(game.sport_key)],
            title: `${game.away_team} at ${game.home_team}`,
            subtitle: `${game.commence_time}`,
          }));
          newGamesChatList = [...newGamesChatList, ...gamesForSport];
        }

        gamesChatList = newGamesChatList;
      })
    )
    .catch((errors) => {
      console.log(`Request failed ${errors}`);
    });
};

updateGameChatList();
cron.schedule("0 0 * * *", updateGameChatList);
cron.schedule("0 8 * * *", updateGameChatList);
cron.schedule("0 16 * * *", updateGameChatList);

// middleware
app.use(express.json());

app.use(cors());

// DB config
const connection_url =
  "mongodb+srv://admin:NAXPOWFdajWIJjP2@cluster0.5czzu.mongodb.net/gamethreadsdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        flair: messageDetails.flair,
        chatroom: messageDetails.chatroom,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});
// api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/v1/chats", (req, res) => {
  res.status(200).send(gamesChatList.concat(defaultChatList));
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New message created: \n ${data}`);
    }
  });
});

// listen
app.listen(port, () => console.log(`Server running on port ${port}`));
