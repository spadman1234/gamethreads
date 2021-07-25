import React, { useState } from "react";
import "./Sidebar.css";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import ChatIcon from "@material-ui/icons/Chat";
import "./img/nfl-league-logo.png";
import {
  AppBar,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

const nflTeamIds = [
  ["arizona-cardinals", "Arizona Cardinals"],
  ["atlanta-falcons", "Atlanta Falcons"],
  ["baltimore-ravens", "Baltimore Ravens"],
  ["buffalo-bills", "Buffalo Bills"],
  ["carolina-panthers", "Carolina Panthers"],
  ["chicago-bears", "Chicago Bears"],
  ["cincinnati-bengals", "Cincinnati Bengals"],
  ["cleveland-browns", "Cleveland Browns"],
  ["dallas-cowboys", "Dallas Cowboys"],
  ["denver-broncos", "Denver Broncos"],
  ["detroit-lions", "Detroit Lions"],
  ["green-bay-packers", "Green Bay Packers"],
  ["houston-texans", "Houston Texans"],
  ["indianapolis-colts", "Indianapolis Colts"],
  ["jacksonville-jaguars", "Jacksonville Jaguars"],
  ["kansas-city-chiefs", "Kansas City Chiefs"],
  ["oakland-raiders", "Las Vegas Raiders"],
  ["los-angeles-chargers", "Los Angeles Chargers"],
  ["los-angeles-rams", "Los Angeles Rams"],
  ["miami-dolphins", "Miami Dolphins"],
  ["minnesota-vikings", "Minnesota Vikings"],
  ["new-england-patriots", "New England Patriots"],
  ["new-orleans-saints", "New Orleans Saints"],
  ["new-york-giants", "New York Giants"],
  ["new-york-jets", "New York Jets"],
  ["philadelphia-eagles", "Philadelphia Eagles"],
  ["pittsburgh-steelers", "Pittsburgh Steelers"],
  ["san-francisco-49ers", "San Francisco 49ers"],
  ["seattle-seahawks", "Seattle Seahawks"],
  ["tampa-bay-buccaneers", "Tampa Bay Buccaneers"],
  ["tennessee-titans", "Tennessee Titans"],
  ["washington-redskins", "Washington Football Team"],
];

const nbaTeamIds = [
  ["atlanta-hawks", "Atlanta Hawks"],
  ["boston-celtics", "Boston Celtics"],
  ["brooklyn-nets", "Brooklyn Nets"],
  ["charlotte-hornets", "Charlotte Hornets"],
  ["chicago-bulls", "Chicago Bulls"],
  ["cleveland-cavaliers", "Cleveland Cavaliers"],
  ["dallas-mavericks", "Dallas Mavericks"],
  ["denver-nuggets", "Denver Nuggets"],
  ["detroit-pistons", "Detroit Pistons"],
  ["golden-state-warriors", "Golden State Warriors"],
  ["houston-rockets", "Houston Rockets"],
  ["indiana-pacers", "Indiana Pacers"],
  ["la-clippers", "Los Angeles Clippers"],
  ["los-angeles-lakers", "Los Angeles Lakers"],
  ["memphis-grizzlies", "Memphis Grizzlies"],
  ["miami-heat", "Miami Heat"],
  ["milwaukee-bucks", "Milwaukee Bucks"],
  ["minnesota-timberwolves", "Minnesota Timberwolves"],
  ["new-orleans-pelicans", "New Orleans Pelicans"],
  ["new-york-knicks", "New York Knicks"],
  ["oklahoma-city-thunder", "Oklahoma City Thunder"],
  ["orlando-magic", "Orlando Magic"],
  ["philadelphia-76ers", "Philadelphia 76ers"],
  ["phoenix-suns", "Phoenix Suns"],
  ["portland-trail-blazers", "Portland Trail Blazers"],
  ["sacramento-kings", "Sacramento Kings"],
  ["san-antonio-spurs", "San Antonio Spurs"],
  ["toronto-raptors", "Toronto Raptors"],
  ["utah-jazz", "Utah Jazz"],
  ["washington-wizards", "Washington Wizards"],
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const FlairDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState("");

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setSelectedTab(index);
  };

  const handleListItemClick = (value, flairImg) => {
    onClose(value, flairImg);
  };

  const handleSearchboxChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <div>
        <AppBar position="static" color="default">
          <DialogTitle id="dialog-title">Choose team flair</DialogTitle>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="tab test"
            centered
          >
            <Tab label="NFL" {...a11yProps(0)} />
            <Tab label="NBA" {...a11yProps(1)} />
            <Tab label="NHL" {...a11yProps(2)} />
            <Tab label="MLB" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis="x"
          index={selectedTab}
          onChangeIndex={handleTabChangeIndex}
        >
          <TabPanel value={selectedTab} index={0}>
            <div className="sidebar-search">
              <div className="sidebar-search-container">
                <SearchOutlined />
                <input
                  placeholder="Search for teams"
                  type="text"
                  onChange={handleSearchboxChange}
                />
              </div>
            </div>
            <List>
              {nflTeamIds
                .filter((team) =>
                  team[1].toLowerCase().includes(searchText.toLowerCase())
                )
                .map((team) => (
                  <ListItem
                    button
                    onClick={() =>
                      handleListItemClick(
                        team[0],
                        `http://loodibee.com/wp-content/uploads/nfl-${team[0]}-team-logo.png`
                      )
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={`http://loodibee.com/wp-content/uploads/nfl-${team[0]}-team-logo.png`}
                    />
                    <p>{team[1]}</p>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <div className="sidebar-search">
              <div className="sidebar-search-container">
                <SearchOutlined />
                <input
                  placeholder="Search for teams"
                  type="text"
                  onChange={handleSearchboxChange}
                />
              </div>
            </div>
            <List>
              {nbaTeamIds
                .filter((team) =>
                  team[1].toLowerCase().includes(searchText.toLowerCase())
                )
                .map((team) => (
                  <ListItem
                    button
                    onClick={() =>
                      handleListItemClick(
                        team[0],
                        team[0] === "denver-nuggets"
                          ? "http://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo-2018.png"
                          : `http://loodibee.com/wp-content/uploads/nba-${team[0]}-logo.png`
                      )
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={
                        team[0] === "denver-nuggets"
                          ? "http://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo-2018.png"
                          : `http://loodibee.com/wp-content/uploads/nba-${team[0]}-logo.png`
                      }
                    />
                    <p>{team[1]}</p>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Item three
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            Item four
          </TabPanel>
        </SwipeableViews>
      </div>
    </Dialog>
  );
};

const Sidebar = () => {
  const testChatList = [
    {
      img: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/052014/mlb.png?itok=4WGm1016",
      title: "New York Mets vs Washington Nationals",
      subtitle: "8:30 PM",
    },
    {
      img: "http://loodibee.com/wp-content/uploads/nfl-league-logo.png",
      title: "Dallas Cowboys vs Philadelphia Eagles",
      subtitle: "1:00 PM",
    },
  ];

  const [currentFlair, setCurrentFlair] = useState(null);
  const [currentFlairImg, setCurrentFlairImg] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchboxValue, setSearchboxValue] = useState("");
  const [chatList, setChatList] = useState(testChatList);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (value, flairImg) => {
    setDialogOpen(false);
    setCurrentFlair(value);
    if (flairImg) {
      setCurrentFlairImg(flairImg);
    }
  };

  const handleSearchboxChange = (event) => {
    setSearchboxValue(event.target.value);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <h1>gamethreads</h1>
          <ChatIcon />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input
            placeholder="Search threads..."
            type="text"
            onChange={handleSearchboxChange}
            value={searchboxValue}
          />
        </div>
      </div>
      <div className="sidebar-chats">
        {chatList
          .filter((chat) =>
            chat.title.toLowerCase().includes(searchboxValue.toLowerCase())
          )
          .map((chat) => (
            <SidebarChat
              img={chat.img}
              title={chat.title}
              subtitle={chat.subtitle}
              key={chat.title}
            />
          ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-flair" onClick={handleDialogOpen}>
          <Avatar src={currentFlairImg} />
          <p>Change your flair</p>
        </div>
      </div>
      <FlairDialog
        selectedValue={currentFlair}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default Sidebar;
