import { TextField, makeStyles, Button, Typography } from "@material-ui/core";
import { SubmitHandler } from "./Handlers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardMain from "../Dashboard/DashboardMain";
import { useAuth } from "../../Context/authStore";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      margin: "1rem",
    },
  },
  textfieldBox: {
    display: "flex",
    maxHeight: "500px",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
const LoginMain = ({ isLoggedIn, setLoading }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  return (
    <>
      {!isLoggedIn ? (
        <form className={classes.root} onSubmit={login}>
          <div className={classes.textfieldBox}>
            <TextField type="email" style={{ margin: "0.7rem" }} label="Email" variant="standard" />
            <TextField type="password" style={{ margin: "0.7rem" }} label="Password" variant="standard" />
          </div>
          <div style={{ display: "flex", alignItems: "center", margin: "0.5rem" }}>
            <Typography>Don't have an accout?</Typography>
            <Button style={{ margin: 0 }} onClick={() => navigate("/user/signup")} variant="text" color="primary">
              Sign Up
            </Button>
          </div>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </form>
      ) : (
        <DashboardMain />
      )}
    </>
  );
};
export default LoginMain;
