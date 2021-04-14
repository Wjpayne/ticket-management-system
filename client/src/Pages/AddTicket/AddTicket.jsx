import {
  Breadcrumbs,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openNewTicket } from "./AddTicketActions";
import { shortText } from "../../utils/Validation";
import { resetSuccessMsg, resetErrorMsg } from "./AddTicketSlice";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const addTicketStyles = makeStyles((theme) => ({
  div: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  paper: {
    backgroundColor: "#FAF9F6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "50px",
    height: "500px",
    width: "500px",
    outline: "none",
    [theme.breakpoints.down("xs")]: {
      height: "500px",
      width: "350px",
    },
    transition: " all 0.30s ease-in-out",
  },

  paperDark: {
    backgroundColor: "#585858",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "50px",
    height: "500px",
    width: "500px",
    outline: "none",
    [theme.breakpoints.down("xs")]: {
      height: "500px",
      width: "350px",
    },
  },

  title: {
    fontSize: "30px",
    marginTop: "20px",
    color: "#FF926B",
    transition: " all 0.30s ease-in-out",
  },

  titleDark: {
    fontSize: "30px",
    marginTop: "20px",
    color: "#ffb347",
    transition: " all 0.30s ease-in-out",
  },
  input: {
    width: "400px",
    backgroundColor: "white",
    "& .Mui-focused": {
      color: "#585858",
    },
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
  },

  form: {
    marginTop: "20px",
  },

  button: {
    color: "#FF926B",
    width: "200px",
    height: "50px",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
    backgroundColor: "#DDDDDD",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
    transition: " all 0.30s ease-in-out",
  },

  buttonDark: {
    color: "#ffb347",
    width: "200px",
    height: "50px",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
    backgroundColor: "#404040",
    "&:hover": {
      backgroundColor: "#404040",
    },
    transition: " all 0.30s ease-in-out",
  },

  date: {
    width: "400px",
    backgroundColor: "	#E0E0E0",
    "& .Mui-focused": {
      color: "#585858",
    },
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
  },
  breadcrumb: {
    position: "relative",
    width: "200px",
    [theme.breakpoints.down("xs")]: {
      left: "28%",
      top: "10%",
    },
  },
  link: {
    color: "black",
    cursor: "pointer",
    transition: " all 0.30s ease-in-out",
  },

  linkDark: {
    color: "white",
    cursor: "pointer",
    transition: " all 0.30s ease-in-out",
  },
  current: {
    color: "#949494",
  },

  container: {
    margin: "6em",
  },
}));

const initialData = {
  subject: "",
  date: "",
  message: "",
};

const initialFormError = {
  subject: false,
  date: false,
  message: false,
};

export const AddTicket = () => {
  const classes = addTicketStyles();

  const { darkMode } = useContext(DarkModeContext);

  const [formData, setFormData] = useState(initialData);
  const [formDataError, setFormDataError] = useState(initialFormError);
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { error, successMsg } = useSelector((state) => state.openTicket);

  useEffect(() => {
    return () => {
      successMsg && dispatch(resetSuccessMsg());
      error && dispatch(resetErrorMsg());
    };
  }, [dispatch, formData, formDataError, error, successMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormDataError(initialFormError);

    const isSubjectValid = await shortText(formData.subject);

    setFormDataError({
      ...initialFormError,
      subject: !isSubjectValid,
    });

    dispatch(openNewTicket({ ...formData, sender: name }));
    setFormData({
      subject: "",
      date: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />
      <div className={classes.div}>
        <div className={classes.container}>
          <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
            <Link
              to="/dashboard"
              className={!darkMode ? classes.link : classes.linkDark}
            >
              Home
            </Link>
            <Typography className={classes.current}>Add New Ticket</Typography>
          </Breadcrumbs>
          <Paper className={!darkMode ? classes.paper : classes.paperDark}>
            <Typography className={!darkMode ? classes.title : classes.titleDark}>Add New Ticket</Typography>
            <div>
              {error && (
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        dispatch(resetErrorMsg());
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              {successMsg && (
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        dispatch(resetSuccessMsg());
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity="success"
                >
                  {successMsg}
                </Alert>
              )}
            </div>

            <form className={classes.form}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                variant="filled"
                margin="normal"
                id="subject"
                label="Subject"
                name="subject"
                className={classes.input}
                onChange={handleChange}
                value={formData.subject}
              />

              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                type="date"
                margin="normal"
                id="date"
                name="date"
                className={classes.date}
                onChange={handleChange}
                value={formData.date}
              />

              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                multiline
                rows={6}
                variant="filled"
                margin="normal"
                required
                id="message"
                label="Please explain your issue"
                name="message"
                className={classes.input}
                onChange={handleChange}
                value={formData.message}
              />
            </form>

            <Button onClick={handleSubmit} className={!darkMode ? classes.button : classes.buttonDark}>
              Open Ticket
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
};
