import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { loginPending, loginSuccess, loginFail } from "./LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { userLogin } from "../../api/userAPI";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../Pages/Dashboard/UserActions";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const landingPageStyles = makeStyles((theme) => ({
  div: {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  paper: {
    transition: " all 0.30s ease-in-out",
    backgroundColor: "#FAF9F6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0",
    height: "500px",
    width: "500px",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: "350px",
      width: "350px",
    },
  },
  paperDark: {
    transition: " all 0.30s ease-in-out",
    backgroundColor: "#585858",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0",
    height: "500px",
    width: "500px",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: "350px",
      width: "350px",
    },
  },

  title: {
    transition: " all 0.30s ease-in-out",
    fontSize: "30px",
    marginTop: "20px",
    color: "#FF926B",
  },

  titleDark: {
    transition: " all 0.30s ease-in-out",
    fontSize: "30px",
    marginTop: "20px",
    color: "#ffb347",
  },
  input: {
    width: "400px",
    backgroundColor: "white",
    "& .Mui-focused": {
      color: "#585858",
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },

  form: {
    marginTop: "60px",
  },

  button: {
    transition: " all 0.30s ease-in-out",
    color: "#FF926B",
    width: "150px",
    height: "50px",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
  },

  buttonDark: {
    transition: " all 0.30s ease-in-out",
    color: "#ffb347",
    width: "150px",
    height: "50px",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
  },


  forget: {
    color: "white",
    position: "relative",
    top: "15px",
  },
  spinner: {
    color: "#ffb347",
    top: "30px",
    left: "20px",
    position: "relative",
  },
}));

export default function LandingPage() {
  const classes = landingPageStyles();

  //set state for form
  const [email, setEmail] = useState("user@user.com");
  const [password, setPassword] = useState("password");
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const { darkMode } = useContext(DarkModeContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    sessionStorage.getItem("accessJWT") && history.push("/dashboard");
  }, [history, isAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill in the form");
    }

    dispatch(loginPending());

    try {
      const isAuth = await userLogin({ email, password });

      if (isAuth.status === "error") {
        return dispatch(loginFail(isAuth.message));
      }
      dispatch(loginSuccess());
      dispatch(getUserProfile());
      history.push("/dashboard");
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };
  return (
    <div className={classes.div}>
      <Paper className={!darkMode ? classes.paper : classes.paperDark}>
        <Typography className={!darkMode ? classes.title : classes.titleDark}>Client Login</Typography>

        <form className={classes.form}>
          {error && (
            <Alert severity="error">
              <AlertTitle style={{ textAlign: "left" }}>Error</AlertTitle>
              Invalid Credentials
            </Alert>
          )}
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            variant="filled"
            margin="normal"
            required
            id="email"
            label="Enter Email"
            name="email"
            autoComplete="email"
            className={classes.input}
            onChange={handleOnChange}
            value={email}
          />

          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            variant="filled"
            margin="normal"
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            className={classes.input}
            onChange={handleOnChange}
            value={password}
          />
        </form>

        <Button onClick={handleSubmit} className={ !darkMode ? classes.button : classes.buttonDark}>
          Login
        </Button>
        {isLoading && <CircularProgress className={classes.spinner} />}
      </Paper>
    </div>
  );
}
