import { makeStyles } from "@material-ui/core";
import React from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import IconButton from "@material-ui/core/IconButton";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const darkStyles = makeStyles((theme) => ({
  container: {
    zIndex: "1000",
    position: "absolute",
    right: ".5em",
    fontSize: "1.5em",
    [theme.breakpoints.down("xs")]: {},
  },

  icon: {
    fontSize: "1.5em",
  },

  iconSun: {
    fontSize: "1.5em",
    color: "#f9d71c",
  },

  hover: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export const DarkMode = () => {
  const classes = darkStyles();

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={classes.container}>
      {!darkMode ? (
        <IconButton
          disableRipple={true}
          className={classes.hover}
          onClick={handleDarkMode}
        >
          <Brightness2Icon className={classes.icon}></Brightness2Icon>
        </IconButton>
      ) : (
        <IconButton className={classes.hover} onClick={handleDarkMode}>
          <WbSunnyIcon className={classes.iconSun}></WbSunnyIcon>
        </IconButton>
      )}
    </div>
  );
};
