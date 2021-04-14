import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";
import { DarkMode } from "../DarkMode/DarkMode";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    margin: "0",
  },

  title: {
    display: "none",
    transition: " all 0.30s ease-in-out",
    color: "#FF926B",
    fontSize: "1.5em",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  titleDark: {
    display: "none",
    transition: " all 0.30s ease-in-out",
    color: "#ffb347",
    fontSize: "1.5em",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "15ch",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    transition: " all 0.30s ease-in-out",
    backgroundColor: "#FAF9F6",
  },
  appBarDark: {
    backgroundColor: "black",
    transition: " all 0.30s ease-in-out",
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    transition: " all 0.30s ease-in-out",
    marginRight: theme.spacing(2),
    color: "#FF926B",
  },

  menuButtonDark: {
    transition: " all 0.30s ease-in-out",
    marginRight: theme.spacing(2),
    color: "#ffb347",
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#FAF9F6",
  },

  drawerPaperDark: {
    width: drawerWidth,
    backgroundColor: "#585858",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  drawerTitle: {
    textAlign: "center",
    fontSize: "20px",
    transition: " all 0.30s ease-in-out",
    color: "#FF926B",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  drawerTitleDark: {
    textAlign: "center",
    fontSize: "20px",
    transition: " all 0.30s ease-in-out",
    color: "#ffb347",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  drawerLinks: {
    transition: " all 0.30s ease-in-out",
    color: "#FF926B",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  drawerLinksDark: {
    transition: " all 0.30s ease-in-out",
    color: "#ffb347",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export function Header() {
  // set state
  const classes = useStyles();
  const theme = useTheme();
  const [open, drawerOpen] = React.useState(false);

  const { darkMode } = useContext(DarkModeContext);

  // handle functions for state

  //open Modals and close Modals

  const handleDrawerOpen = () => {
    drawerOpen(!open);
  };

  const handleDrawerClose = () => {
    drawerOpen(false);
  };

  const history = useHistory();

  const logOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    history.push("/");
  };

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={
          !darkMode
            ? clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })
            : clsx(classes.appBarDark, {
                [classes.appBarShift]: open,
              })
        }
      >
        <DarkMode />
        <Toolbar>
          <IconButton
            edge="start"
            className={!darkMode ? classes.menuButton : classes.menuButtonDark}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Button
          disableRipple = {true}
            component={Link}
            to="/dashboard"
            className={!darkMode ? classes.title : classes.titleDark}
          >
            Ticket Management System
          </Button>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={
          !darkMode
            ? {
                paper: classes.drawerPaper,
              }
            : { paper: classes.drawerPaperDark }
        }
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Button
          component={Link}
          to="/dashboard"
          className={!darkMode ? classes.drawerTitle : classes.drawerTitleDark}
        >
          Ticket Management System
        </Button>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText
              className={
                !darkMode ? classes.drawerLinks : classes.drawerLinksDark
              }
            >
              {" "}
              Dashboard
            </ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/ticket-list">
            <ListItemText
              className={
                !darkMode ? classes.drawerLinks : classes.drawerLinksDark
              }
            >
              Tickets
            </ListItemText>
          </ListItem>

          <ListItem button onClick={logOut}>
            <ListItemText
              className={
                !darkMode ? classes.drawerLinks : classes.drawerLinksDark
              }
            >
              Log out
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
