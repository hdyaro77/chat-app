import { Avatar, Badge, Divider, Button, makeStyles, Paper, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Account from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Dimensions } from "../../HelperFiles/Dimensions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import users from "../../Data/users.json";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../Context/authStore";
import axios from "axios";
import { fetchFriends } from "../Handlers";
import SingleUser from "./SingleUser";
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles({
  root: {
    maxWidth: "200px",
    width: "200px",
    position: "absolute",
    backgroundColor: "#43d3c5",
    zIndex: "100",
    top: "0",
    right: "0",
    height: "100%",
    transition: "all 0.5s",
    borderLeft: "2px solid #ffffff",
  },
  badge: {
    margin: "0.5rem",
    "& span": {
      padding: "0",
      minWidth: "15px",
      height: "15px",
      backgroundColor: "green",
    },
  },
});

const UserPanel = ({ activeChat, setActiveChat, userData, addFriend, setLoading }) => {
  const classes = useStyle();
  const { width: wid } = Dimensions();
  const [active, setActive] = useState(null);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    fetchFriends(userData, setFriends);
  }, [userData, addFriend]);
  return (
    <Paper className={classes.root} style={{ width: wid >= 600 ? "30%" : "auto" }} elevation={0}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "2rem",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Typography variant="h5" align="center">
            Friends
          </Typography>
        </div>
        {friends?.map((user) => {
          return (
            <SingleUser
              key={user._id}
              id={user._id}
              userID={userData._id}
              name={user?.name}
              setActive={setActiveChat}
              activeChat={activeChat}
              setLoading={setLoading}
            />
          );
        })}
        <div style={{ position: "absolute", bottom: "10px", margin: "auto" }}>
          <IconButton onClick={() => navigate("/home/profile")}>
            <Account fontSize="large" />
          </IconButton>
          <IconButton onClick={logout}>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

export default UserPanel;
