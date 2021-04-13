import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Header } from "../../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTickets } from "../TicketPage/TicketActions";
import { TicketTableDashboard } from "../../Components/TicketTableDashboard/TicketTableDashboard";

const dashboardStyles = makeStyles((theme) => ({
  add: {
    fontSize: "1.2rem",
    backgroundColor: "#585858",
    color: "#ffb347",
    "&:hover": {
      backgroundColor: "#585858",
    },
  },
  text: {
    marginTop: "30px",
    fontSize: "20px",
    color: "#fff",
  },

  link: {
    color: "#585858",
    cursor: "pointer",
  },
  current: {
    color: "black",
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
            <Button component={Link} to="/add-ticket" className={classes.add}>
              Add New Ticket
            </Button>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>
              Total tickets: {totalTickets}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>
              Pending Tickets: {pendingTickets.length}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography className={classes.text}>
              Recently added tickets
            </Typography>

            <Grid item>
              <TicketTableDashboard />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
