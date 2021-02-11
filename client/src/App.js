import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { AddTicket } from "./Pages/AddTicket/AddTicket";
import { TicketList } from "./Pages/TicketList";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { TicketPage } from "./Pages/TicketPage/TicketPage";
import { Switch, Route, withRouter, HashRouter } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoutes/PrivateRoute";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AnimatedSwitch = withRouter(({location}) => (
  <TransitionGroup>
    <CSSTransition key = {location.pathname} timeout = {700} classNames = "slide">
  <Switch location = {location}>
  <Route exact path="/">
    <LandingPage />
  </Route>
  <PrivateRoute path="/dashboard">
    <Dashboard />
  </PrivateRoute>
  <PrivateRoute path="/add-ticket">
    <AddTicket />
  </PrivateRoute>
  <PrivateRoute path="/ticket-list">
    <TicketList />
  </PrivateRoute>
  <PrivateRoute path="/ticket/:ID">
    <TicketPage />
  </PrivateRoute>
</Switch>
</CSSTransition>
</TransitionGroup>
));




function App() {

  return (
    <div className="App">
      <HashRouter>
       <AnimatedSwitch />

       </HashRouter>
    </div>
  );
}

export default App;
