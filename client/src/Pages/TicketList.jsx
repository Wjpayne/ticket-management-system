import {
  Breadcrumbs,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useContext } from "react";
import { TicketTable } from "../Components/TicketTable/TicketTable";
import { Header } from "../Components/Layout/Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchAllTickets,
  filterSearchTicket,
} from "./TicketPage/TicketActions";
import DarkModeContext from "../DarkModeContext/DarkModeContext";

const ticketListStyles = makeStyles((theme) => ({
  breadcrumb: {
    width: "200px",
    color: "black",
    position: "relative",
    right: "20em",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      right: "4em",
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
  div: {
    height: "100vh",

    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  add: {
    fontSize: "1.2rem",
    backgroundColor: "#FAF9F6",
    color: "#FF926B",
    height: "57px",
    top: "20px",
    "&:hover": {
      backgroundColor: "#FAF9F6",
    },
    transition: " all 0.30s ease-in-out",
  },

  addDark: {
    fontSize: "1.2rem",
    backgroundColor: "#585858",
    color: "#ffb347",
    height: "57px",
    top: "20px",
    "&:hover": {
      backgroundColor: "#585858",
    },
    transition: " all 0.30s ease-in-out",
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
      width: "300px",
    },
  },

  table: {
    marginTop: "150px",
  },
}));

export const TicketList = () => {
  const classes = ticketListStyles();
  const dispatch = useDispatch();

  const  { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleChange = (e) => {
    const { value } = e.target;

    dispatch(filterSearchTicket(value));
  };

  return (
    <div>
      <Header />
      <div className={classes.div}>
        <div>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid style={{ marginTop: "10em" }} item>
              <Breadcrumbs
                className={classes.breadcrumb}
                aria-label="breadcrumb"
              >
                <Link to="/dashboard" className={!darkMode ? classes.link : classes.linkDark}>
                  Home
                </Link>
                <Typography className={classes.current}>Tickets</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Button component={Link} to="/add-ticket" className={!darkMode ? classes.add : classes.addDark}>
                Add New Ticket
              </Button>
            </Grid>
            <Grid xs={12} item>
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
                  onChange={handleChange}
                ></TextField>
              </form>
              <Grid className={classes.table} item>
                <TicketTable />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
