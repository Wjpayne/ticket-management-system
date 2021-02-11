
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  successMsg: "",
};
const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    openNewTicketPending: (state) => {
      state.isLoading = true;
    },
    openNewTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    openNewTicketFail: (state, { payload }) => {
      state.isLoading = true;
      state.error = payload;
    },
    restSuccessMsg: (state) => {
      state.isLoading = true;
      state.successMsg = "";
    },
    restErrorMsg: (state) => {
      state.isLoading = true
      state.error = ""
    }
  },
});

export const {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
  restSuccessMsg,
  restErrorMsg
} = newTicketSlice.actions;
export default newTicketSlice.reducer;