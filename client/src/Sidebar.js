import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { SearchOutlined, SportsFootball } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
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
import { nbaTeamIds, nflTeamIds, mlbTeamIds, nhlTeamIds } from "./teamIds";
import axios from "./axios";
import images from "./images.js";

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
    setSearchText("");
    onClose(selectedValue);
  };

  const handleTabChange = (event, newValue) => {
    setSearchText("");
    setSelectedTab(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setSelectedTab(index);
  };

  const handleListItemClick = (value, flairImg) => {
    setSearchText("");
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
                  autoFocus
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
                        `nfl-${team[0]}-team-logo.png`
                      )
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={
                        images[`nfl-${team[0]}-team-logo.png`]
                          ? images[`nfl-${team[0]}-team-logo.png`].default
                          : ""
                      }
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
                  autoFocus
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
                      handleListItemClick(team[0], `nba-${team[0]}-logo.png`)
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={images[`nba-${team[0]}-logo.png`].default}
                    />
                    <p>{team[1]}</p>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <div className="sidebar-search">
              <div className="sidebar-search-container">
                <SearchOutlined />
                <input
                  placeholder="Search for teams"
                  type="text"
                  onChange={handleSearchboxChange}
                  autoFocus
                />
              </div>
            </div>
            <List>
              {nhlTeamIds
                .filter((team) =>
                  team[1].toLowerCase().includes(searchText.toLowerCase())
                )
                .map((team) => (
                  <ListItem
                    button
                    onClick={() =>
                      handleListItemClick(team[0], `nhl-${team[0]}-logo.png`)
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={images[`nhl-${team[0]}-logo.png`].default}
                    />
                    <p>{team[1]}</p>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <div className="sidebar-search">
              <div className="sidebar-search-container">
                <SearchOutlined />
                <input
                  placeholder="Search for teams"
                  type="text"
                  onChange={handleSearchboxChange}
                  autoFocus
                />
              </div>
            </div>
            <List>
              {mlbTeamIds
                .filter((team) =>
                  team[1].toLowerCase().includes(searchText.toLowerCase())
                )
                .map((team) => (
                  <ListItem
                    button
                    onClick={() =>
                      handleListItemClick(team[0], `mlb-${team[0]}-logo.png`)
                    }
                    key={team[0]}
                  >
                    <Avatar
                      className="team-avatar"
                      src={images[`mlb-${team[0]}-logo.png`].default}
                    />
                    <p>{team[1]}</p>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
        </SwipeableViews>
      </div>
    </Dialog>
  );
};

const Sidebar = (props) => {
  const [currentFlair, setCurrentFlair] = useState(null);
  const [currentFlairImg, setCurrentFlairImg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchboxValue, setSearchboxValue] = useState("");
  const [chatList, setChatList] = useState([]);

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    axios.get("/api/v1/chats").then((response) => {
      const newChatList = response.data.filter((chat) => {
        if (chat.subtitle[chat.subtitle.length - 1] !== "Z") {
          return true;
        } else {
          const gameTime = new Date(chat.subtitle);
          if (isToday(gameTime)) {
            return true;
          } else {
            return false;
          }
        }
      });
      setChatList(newChatList);
    });
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (value, flairImg) => {
    setDialogOpen(false);
    setCurrentFlair(value);
    if (flairImg) {
      setCurrentFlairImg(flairImg);
      props.setFlair(flairImg);
    }
  };

  const handleSearchboxChange = (event) => {
    setSearchboxValue(event.target.value);
  };

  const handleSidebarChatSelect = (chat) => {
    if (props.username) props.setChat(chat);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <h1>gamethreads</h1>
          <SportsFootball />
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
            <div key={chat.title} onClick={() => handleSidebarChatSelect(chat)}>
              <ListItem disabled={props.username ? false : true} button>
                <SidebarChat
                  img={chat.img}
                  title={chat.title}
                  subtitle={chat.subtitle}
                  key={chat.title}
                />
              </ListItem>
            </div>
          ))}
      </div>

      <div className="sidebar-footer">
        <ListItem
          disabled={props.username ? false : true}
          button
          onClick={handleDialogOpen}
        >
          <div className="sidebar-flair">
            <Avatar
              src={
                currentFlairImg !== "" ? images[currentFlairImg].default : ""
              }
              alt={currentFlair}
            />
            <p>Change your flair</p>
          </div>
        </ListItem>
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
