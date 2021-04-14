import "./App.css";
import LoginForm from "./Components/Login/LoginForm";
import { AddTicket } from "./Pages/AddTicket/AddTicket";
import { TicketList } from "./Pages/TicketList";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { TicketPage } from "./Pages/TicketPage/TicketPage";
import { Switch, Route, withRouter, BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import DarkModeContext from "./DarkModeContext/DarkModeContext"
import { DarkMode } from "./Components/DarkMode/DarkMode";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.pathname} timeout={700} classNames="slide">
      <Switch location={location}>
        <Route exact path="/">
          <DarkMode />
          <LoginForm />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/add-ticket">
          <AddTicket />
        </Route>
        <Route path="/ticket-list">
          <TicketList />
        </Route>
        <Route path="/ticket/:ID">
          <TicketPage />
        </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

const useStyles = makeStyles(() => ({
  mainLight: {
    backgroundColor: "#DDDDDD",
    transition: " all 0.30s ease-in-out"
  },
  mainDark: {
    backgroundColor: "#404040",
    transition: " all 0.30s ease-in-out"
  },
}));

function App() {
  const classes = useStyles();

  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="App">
      <DarkModeContext.Provider value = {{ darkMode, setDarkMode }}>
      <div className={!darkMode ? classes.mainLight : classes.mainDark}>
        <BrowserRouter>
          <AnimatedSwitch />
        </BrowserRouter>
      </div>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
