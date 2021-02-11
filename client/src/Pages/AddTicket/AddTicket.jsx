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
import { restSuccessMsg, restErrorMsg } from "./AddTicketSlice";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const addTicketStyles = makeStyles((theme) => ({
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
    marginTop: "20px",
  },

  button: {
    color: "#ffb347",
    width: "200px",
    height: "50px",
    fontSize: "30px",
    marginTop: "20px",
    textTransform: "none",
  },

  date: {
    width: "400px",
    backgroundColor: "	#E0E0E0",
    "& .Mui-focused": {
      color: "#585858",
    },
    height: "40px",
  },
  breadcrumb: {
    left: "30%",
    position: "relative",
    top: "25%",
  },
  link: {
    color: "#585858",
    cursor: "pointer",
  },
  current: {
    color: "black",
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

  const [formData, setFormData] = useState(initialData);
  const [formDataError, setFormDataError] = useState(initialFormError);
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { error, successMsg } = useSelector((state) => state.openTicket);

  useEffect(() => {
    return () => {
      successMsg && dispatch(restSuccessMsg());
      error && dispatch(restErrorMsg());
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
        <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
          <Link to="/dashboard" className={classes.link}>
            Home
          </Link>
          <Typography className={classes.current}>Add New Ticket</Typography>
        </Breadcrumbs>
        <Paper className={classes.paper}>
          <Typography className={classes.title}>Add New Ticket</Typography>
          <div>
            {error && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(restErrorMsg());
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
                      dispatch(restSuccessMsg());
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

          <Button onClick={handleSubmit} className={classes.button}>
            Open Ticket
          </Button>
        </Paper>
      </div>
    </div>
  );
};
