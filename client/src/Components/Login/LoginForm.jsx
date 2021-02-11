import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { loginPending, loginSuccess, loginFail } from "./LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { userLogin } from "../../api/userAPI";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../Pages/Dashboard/UserActions";

const landingPageStyles = makeStyles((theme) => ({
  div: {
    position: "relative",
    height: "1300px",
  },

  paper: {
    backgroundColor: "#585858",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "500px",
    width: "500px",
    outline: "none",
  },

  title: {
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
  },

  form: {
    marginTop: "60px",
  },

  button: {
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
  const [email, setEmail] = useState("payne.j.will@gmail.com");
  const [password, setPassword] = useState("password");
  const { isLoading, isAuth, error } = useSelector((state) => state.login);

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
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Client Login</Typography>

        <form className={classes.form}>
          {error && (
            <Alert severity="error">
              <AlertTitle style={{ textAlign: "left" }}>Error</AlertTitle>
              Inavlid Credentials
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

        <Button onClick={handleSubmit} className={classes.button}>
          Login
        </Button>
        {isLoading && <CircularProgress className={classes.spinner} />}
      </Paper>
    </div>
  );
}
