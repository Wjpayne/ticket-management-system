import {
  Breadcrumbs,
  makeStyles,
  Typography,
  Grid,
  Paper,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  TextField,
  IconButton,
  createMuiTheme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { MessageHistory } from "../../Components/MessageHistory/MessageHistory";
import { Alert } from "@material-ui/lab";
import { replyOnTicket, closeTicket, fetchSingleTicket } from "./TicketActions";
import { resetResponseMsg, resetErrorMsg } from "../TicketPage/TicketSlice";
import CloseIcon from "@material-ui/icons/Close";
import { ThemeProvider } from "@material-ui/styles";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const ticketPageStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    cursor: "pointer",
  },

  linkDark: {
    color: "white",
    cursor: "pointer",
  },

  div: {
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  current: {
    color: "#949494",
  },
  paper: {
    transition: " all 0.30s ease-in-out",
    backgroundColor: "#FAF9F6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "200px",
    height: "1000px",
    width: "1000px",
    outline: "none",
    overflow: "scroll",
    [theme.breakpoints.down("md")]: {
      height: "900px",
      width: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "800px",
      minWidth: "350px",
    },
  },

  paperDark: {
    transition: " all 0.30s ease-in-out",
    backgroundColor: "#585858",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "200px",
    height: "1000px",
    width: "1000px",
    outline: "none",
    overflow: "scroll",
    [theme.breakpoints.down("md")]: {
      height: "900px",
      width: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "800px",
      minWidth: "350px",
    },
  },
  text: {
    transition: " all 0.30s ease-in-out",
    marginTop: "30px",
    display: "inline-flex",
    fontWeight: "bold",
    color: "textDark",
  },

  textDark: {
    transition: " all 0.30s ease-in-out",
    marginTop: "30px",
    display: "inline-flex",
    fontWeight: "bold",
    color: "white",
  },

  button: {
    transition: " all 0.30s ease-in-out",
    marginTop: "20px",
    backgroundColor: "#DDDDDD",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
    color: "#FF926B",
    fontSize: "20px",
  },

  buttonDark: {
    transition: " all 0.30s ease-in-out",
    marginTop: "20px",
    backgroundColor: "#404040",
    "&:hover": {
      backgroundColor: "#404040",
    },
    color: "#ffb347",
    fontSize: "20px",
  },

  form: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },

  input: {
    color: "black",
    backgroundColor: "lightgray",
    "& .Mui-focused": {
      color: "black",
    },
  },

  close: {
    transition: " all 0.30s ease-in-out",
    float: "right",
    color: "#FF926B",
    fontSize: "20px",
    marginTop: "20px",
    textTransform: "none",
    backgroundColor: "#DDDDDD",
    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
  },

  closeDark: {
    transition: " all 0.30s ease-in-out",
    float: "right",
    color: "#ffb347",
    fontSize: "20px",
    marginTop: "20px",
    textTransform: "none",
    backgroundColor: "#404040",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  error: {
    margin: "15px",
    position: "relative",
  },

  breadcrumb: {
    left: "25%",
    top: "150px",
    position: "absolute",
    width: "200px",
  },

  formTitle: {
    color: "black",
    transition: " all 0.30s ease-in-out",
  },

  formTitleDark: {
    color: "white",
    transition: " all 0.30s ease-in-out",
  },
}));

export const TicketPage = () => {
  const classes = ticketPageStyles();
  const { ID } = useParams();
  const dispatch = useDispatch();
  const { error, selectedTicket, replyTicketError, replyMsg } = useSelector(
    (state) => state.tickets
  );
  const [message, setMessage] = useState("");

  const { darkMode } = useContext(DarkModeContext);

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = () => {
    const msgObj = {
      message,
      sender: name,
    };
    dispatch(replyOnTicket(ID, msgObj));
    setMessage("");
  };

  useEffect(() => {
    dispatch(fetchSingleTicket(ID));
    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
      error && dispatch(resetErrorMsg());
    };
  }, [ID, dispatch, replyMsg, replyTicketError, error]);

  const theme = createMuiTheme({
    palette: {
      action: {
        disabled: "white",
      },
    },
  });

  return (
    <div>
      <Header />

      <div className={classes.div}>
        <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
          <Link
            to="/dashboard"
            className={!darkMode ? classes.link : classes.linkDark}
          >
            Home
          </Link>
          <Typography className={classes.current}>Ticket</Typography>
        </Breadcrumbs>

        <Paper className={!darkMode ? classes.paper : classes.paperDark}>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => dispatch(closeTicket(ID))}
              className={!darkMode ? classes.close : classes.closeDark}
              disabled={selectedTicket.status === "Closed"}
            >
              Close Ticket
            </Button>
          </ThemeProvider>

          <Grid container direction="column" alignItems="flex-start">
            <Typography className={!darkMode ? classes.text : classes.textDark}>
              Subject: {selectedTicket.subject}
            </Typography>
            <div className={!darkMode ? classes.text : classes.textDark}>
              Ticket Open:{" "}
              {selectedTicket.openAt &&
                new Date(selectedTicket.openAt).toLocaleString()}
            </div>
            <div className={!darkMode ? classes.text : classes.textDark}>
              Status: {selectedTicket.status}{" "}
            </div>
          </Grid>
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
                className={classes.error}
                severity="error"
              ></Alert>
            )}
            {replyTicketError && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(resetResponseMsg());
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                className={classes.error}
                severity="error"
              >
                {replyTicketError}
              </Alert>
            )}
            {replyMsg && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(resetResponseMsg());
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                className={classes.error}
                severity="success"
              >
                {replyMsg}
              </Alert>
            )}
          </div>
          {selectedTicket.conversations && (
            <MessageHistory msg={selectedTicket.conversations} />
          )}

          <form className={classes.form}>
            <FormControl>
              <FormGroup>
                <FormLabel
                  className={
                    !darkMode ? classes.formTitle : classes.formTitleDark
                  }
                  component="legend"
                >
                  Please reply with a message to update the ticket
                </FormLabel>
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  variant="filled"
                  id="reply"
                  name="reply"
                  label="Reply..."
                  rows={10}
                  multiline
                  value={message}
                  onChange={handleChange}
                  className={classes.input}
                ></TextField>
                <Button
                  onClick={onSubmit}
                  className={!darkMode ? classes.button : classes.buttonDark}
                >
                  Reply
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </div>
    </div>
  );
};
