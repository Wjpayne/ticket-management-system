import "./App.css";
import  LoginForm  from "./Components/Login/LoginForm";
import { AddTicket } from "./Pages/AddTicket/AddTicket";
import { TicketList } from "./Pages/TicketList";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { TicketPage } from "./Pages/TicketPage/TicketPage";
import { Switch, Route, withRouter, BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.pathname} timeout={700} classNames="slide">
      <Switch location={location}>
        <Route exact path="/">
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

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedSwitch />
      </BrowserRouter>
    </div>
  );
}

export default App;
