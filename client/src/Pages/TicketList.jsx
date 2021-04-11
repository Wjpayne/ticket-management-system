import {
  Breadcrumbs,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { TicketTable } from "../Components/TicketTable/TicketTable";
import { Header } from "../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllTickets, filterSearchTicket } from "./TicketPage/TicketActions";


const ticketListStyles = makeStyles((theme) => ({
  breadcrumb: {

    left: "25%",
    top: "5px",
    position: "absolute",
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      left: "5%",
      top: "-40px"
      
    },
  },
  link: {
    color: "#585858",
    cursor: "pointer",
  },
  current: {
    color: "black",
  },
  div: {
    marginTop: "200px",
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",

  },
  add: {
    fontSize: "1.2rem",
    backgroundColor: "#585858",
    color: "#ffb347",
    height: "57px",
    top: "20px",
  },

  text: {
    marginTop: "30px",
    fontSize: "20px",
  },

  search: {
    backgroundColor: "white",
    "& .Mui-focused": {
      color: "#585858",
    },
    borderRadius: "5px",
    top: "70px",
    width: "700px",
    [theme.breakpoints.down("xs")]: {
     width: "300px"
    },
  },

  table: {
    marginTop: "150px",
  },
}));

export const TicketList = () => {
  const classes = ticketListStyles()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleChange = (e) => {
    const { value } = e.target 
    
    dispatch(filterSearchTicket(value))
  }




  return (
    <div >
       <Header />
    <div className={classes.div} >
     
      <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
        <Link to="/dashboard" className={classes.link}>
          Home
        </Link>
        <Typography className={classes.current}>Tickets</Typography>
      </Breadcrumbs>
      <Grid
        
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid  item>
          <Button component={Link} to="/add-ticket" className={classes.add}>
            Add New Ticket
          </Button>
        </Grid>
        <Grid xs = {12} item>
          <form>
            <TextField
              InputProps={{
                disableUnderline: true,
              }}
              className={classes.search}
              label="Search..."
              variant="filled"
              id="search"
              name="search"
              onChange = {handleChange}
            ></TextField>
          </form>
          <Grid className = {classes.table} item>
            <TicketTable  />
          </Grid>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};
