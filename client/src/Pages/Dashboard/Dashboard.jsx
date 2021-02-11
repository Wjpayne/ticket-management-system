import {
  Grid,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Header } from "../../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTickets } from "../TicketPage/TicketActions";
import { TicketTableDashboard } from '../../Components/TicketTableDashboard/TicketTableDashboard';

const dashboardStyles = makeStyles(() => ({
  add: {
    fontSize: "1.2rem",
    backgroundColor: "#585858",
    color: "#ffb347",
  },
  text: {
    marginTop: "30px",
    fontSize: "20px",
  },

  div: {
    position: "relative",
    top: "200px",
  },

  link: {
    color: "#585858",
    cursor: "pointer",
  },
  current: {
    color: "black",
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
    <div className={classes.div}>
      <Header />
      <Grid container direction="row" justify="center" alignItems="center">
        
        <Grid xs = {12} md = {8} lg = {6} xl = {4} item>
          <Button component={Link} to="/add-ticket" className={classes.add}>
            Add New Ticket
          </Button>
          <Typography className={classes.text}>
            Total tickets: {totalTickets}
          </Typography>
          <Typography className={classes.text}>
            Pending Tickets: {pendingTickets.length}
          </Typography>
          <Grid item>
            <Typography className={classes.text}>
              Recently added tickets
            </Typography>
            <Grid  item>
              <TicketTableDashboard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
