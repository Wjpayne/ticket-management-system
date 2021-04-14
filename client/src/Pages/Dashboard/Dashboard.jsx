import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Header } from "../../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTickets } from "../TicketPage/TicketActions";
import { TicketTableDashboard } from "../../Components/TicketTableDashboard/TicketTableDashboard";
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const dashboardStyles = makeStyles((theme) => ({
  add: {
    fontSize: "1.2rem",
    backgroundColor: "#FAF9F6",
    color: "#FF926B",
    "&:hover": {
      backgroundColor: "#FAF9F6",
    },
    transition: " all 0.30s ease-in-out",
  },

  addDark: {
    fontSize: "1.2rem",
    backgroundColor: "#585858",
    color: "#ffb347",
    "&:hover": {
      backgroundColor: "#585858",
    },
    transition: " all 0.30s ease-in-out",
  },
  text: {
    marginTop: "30px",
    fontSize: "20px",
    color: "black",
    transition: " all 0.30s ease-in-out",
  },

  textDark: {
    marginTop: "30px",
    fontSize: "20px",
    color: "#fff",
    transition: " all 0.30s ease-in-out",
  },

  div: {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",

    [theme.breakpoints.down("xs")]: {},
  },

  grid: {
    margin: "100px",
  },
}));

export const Dashboard = () => {
  const classes = dashboardStyles();

  const { darkMode } = useContext(DarkModeContext);

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;
  return (
    <div>
      <Header />
      <div className={classes.div}>
        <Grid
          className={classes.grid}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              component={Link}
              to="/add-ticket"
              className={!darkMode ? classes.add : classes.addDark}
            >
              Add New Ticket
            </Button>
          </Grid>
          <Grid item>
            <Typography className={!darkMode ? classes.text : classes.textDark}>
              Total tickets: {totalTickets}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={!darkMode ? classes.text : classes.textDark}>
              Pending Tickets: {pendingTickets.length}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography className={!darkMode ? classes.text : classes.textDark}>
              Recently added tickets
            </Typography>

            <Grid item>
              <TicketTableDashboard />
            </Grid>

  

            <Button
              component={Link}
              to="/ticket-list"
              className={!darkMode ? classes.add : classes.addDark}
              style = {{margin: "2em"}}
            >
               See all tickets
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
