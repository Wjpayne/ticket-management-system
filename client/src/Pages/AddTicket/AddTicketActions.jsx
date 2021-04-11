import {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
} from "./AddTicketSlice";
import { createNewTicket } from "../../api/TicketAPI";

export const openNewTicket =  (formData) => async (dispatch) => {
  
    try {
      dispatch(openNewTicketPending());

      ////call api
      const result = await createNewTicket(formData);
      if (result.status === "error") {
        return dispatch(openNewTicketFail(result.message));
      }
      dispatch(openNewTicketSuccess(result.message));
    } catch (error) {
      console.log(error.message);
      dispatch(openNewTicketFail(error.message));
    }
  
};
