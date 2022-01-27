import { TextField, makeStyles, Button } from "@material-ui/core";
import { useAuth } from "../../Context/authStore";
import { SubmitHandler } from "./Handlers";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      margin: "2rem",
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
const RegisterMain = () => {
  const classes = useStyle();
  const { signUp } = useAuth();
  return (
    <form className={classes.root} onSubmit={signUp}>
      <div className={classes.textfieldBox}>
        <TextField style={{ margin: "0.7rem" }} label="Name" variant="standard" />
        <TextField type="email" style={{ margin: "0.7rem" }} label="Email" variant="standard" />
        <TextField type="password" style={{ margin: "0.7rem" }} label="Password" variant="standard" />
        <TextField type="password" style={{ margin: "0.7rem" }} label="Confirm Password" variant="standard" />
      </div>
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
    </form>
  );
};
export default RegisterMain;
