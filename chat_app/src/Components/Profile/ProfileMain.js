import { Avatar, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../Context/authStore";
import { Dimensions } from "../HelperFiles/Dimensions";
import { addFriendHandler, fetchUsers } from "./Handlers";
const useStyle = makeStyles({
  root: {
    display: "flex",
    position: "absolute",
    paddingTop: "1rem",
    height: "calc(100% - 50px - 1rem)",
    boxSizing: "border-box",
    top: "calc(1rem + 50px)",
    left: 0,
    zIndex: "50",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    margin: "auto",
  },
  info: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      margin: "1rem",
    },
  },
  textfield: {
    color: "#000000",
  },
});

const TextBlock = ({ label, value }) => {
  const classes = useStyle();
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Typography align="center" style={{ fontSize: "21px" }}>
        {value}
      </Typography>
    </div>
  );
};
const ProfileMain = ({ userData, addFriend }) => {
  const classes = useStyle();
  const { width: wid } = Dimensions();
  const params = useParams();
  const pathname = useLocation().search;
  const id = new URLSearchParams(pathname).get("id");
  const [profile, setProfile] = useState(userData);
  const { update } = useAuth();
  useEffect(() => {
    if (!id) {
      setProfile(userData);
      return;
    }
    fetchUsers(id, setProfile);
  }, [id]);
  return (
    <div className={classes.root} style={{ width: wid >= 600 ? "calc(100% - 200px)" : "calc(100% - 60px)" }}>
      {/* <div> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem auto",
        }}
      >
        <Avatar
          src="https://img.icons8.com/color/144/000000/circled-user-male-skin-type-7--v2.png"
          className={classes.avatar}
        />
      </div>
      {id ? (
        <div id="messageBox" className={classes.info}>
          <TextBlock label="Name" value={profile?.name} />
          <TextBlock label="Email" value={profile?.email} />
          <Button
            onClick={() => addFriendHandler(id, userData._id, addFriend, userData, update)}
            disabled={userData.friends.includes(id)}
            variant="contained"
          >
            Add friend
          </Button>
        </div>
      ) : (
        <div id="messageBox" className={classes.info}>
          <Typography variant="h4" align="center">
            Hello , {profile?.name}
          </Typography>
          <Typography align="center" variant="h5">
            Select a friend to Chat
          </Typography>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
export default ProfileMain;
