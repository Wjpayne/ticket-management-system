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
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Header } from "../../Components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { MessageHistory } from "../../Components/MessageHistory/MessageHistory";
import { Alert } from "@material-ui/lab";
import { replyOnTicket, closeTicket, fetchSingleTicket } from "./TicketActions";
import { resetResponseMsg } from "../TicketPage/TicketSlice";
import CloseIcon from "@material-ui/icons/Close";

const ticketPageStyles = makeStyles((theme) => ({
  breadcrumb: {
    left: "25%",
    position: "relative",
    width: "200px",
  },
  link: {
    color: "#585858",
    cursor: "pointer",
  },

  div: {
    position: "relative",
    height: "1300px",
    top: "200px",
    [theme.breakpoints.down("md")]: {
      height: "675px",
      width: "350px",
      left: "50%",
      transform: "translate(-50%)",
    },
  },
  current: {
    color: "black",
  },
  paper: {
    backgroundColor: "#fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "1000px",
    width: "1000px",
    outline: "none",
    overflow: "scroll",
    [theme.breakpoints.down("md")]: {
      height: "675px",
      width: "350px",
      left: "50%",
      top: "420px",
    },
  },
  text: {
    marginBottom: "60px",
    display: "inline-flex",
    fontWeight: "bold",
  },

  button: {
    marginTop: "20px",
  },

  form: {
    position: "absolute",
    marginTop: "40px",
    left: "50%",
    transform: "translateX(-50%)",
  },

  input: {
    "& .Mui-focused": {
      color: "#585858",
    },
  },

  close: {
    float: "right",
    color: "#ffb347",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
    backgroundColor: "#585858",
  },
  error: {
    margin: "15px",
    position: "relative",
  },
}));

export const TicketPage = () => {
  const classes = ticketPageStyles();
  const { ID } = useParams();
  const dispatch = useDispatch();
  const { error, selectedTicket, replyTicketError, replyMsg, resetErrorMsg } = useSelector(
    (state) => state.tickets
  );

  const {
    user: { name },
  } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

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
      (message || replyTicketError) && dispatch(resetResponseMsg());
      (error && dispatch(resetErrorMsg()))
    };
  }, [ID, dispatch, message, replyTicketError, error, resetErrorMsg]);

  return (
    <div>
      <Header />
    <div className={classes.div}>
      
      <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
        <Link to="/dashboard" className={classes.link}>
          Home
        </Link>
        <Typography className={classes.current}>Ticket</Typography>
      </Breadcrumbs>
      <Paper className={classes.paper}>
        <Button
          onClick={() => dispatch(closeTicket(ID))}
          className={classes.close}
          disabled={selectedTicket.status === "Closed"}
        >
          Close Ticket
        </Button>

        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.text}>
            Subject: {selectedTicket.subject}
          </Typography>
          <div className={classes.text}>
            Ticket Open:{" "}
            {selectedTicket.openAt &&
              new Date(selectedTicket.openAt).toLocaleString()}
          </div>
          <div className={classes.text}>Status: {selectedTicket.status} </div>
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
              <FormLabel component="legend">
                Please reply with a message here or update the ticket
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
              <Button onClick={onSubmit} className={classes.button}>
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
