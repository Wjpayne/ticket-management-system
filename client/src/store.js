
import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./Pages/TicketPage/TicketSlice";
import loginReducer from "./Components/Login/LoginSlice";
import userReducer from "./Pages/Dashboard/UserSlice"
import newTicketReducer from "./Pages/AddTicket/AddTicketSlice"


const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    openTicket: newTicketReducer


  },
});

export default store;