import { getUserPending, getUserSuccess, getUserFail } from "./UserSlice";
import {fetchUser} from "../../api/userAPI"

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    const result = await fetchUser()

    if(result.user && result.user._id)
    return dispatch(getUserSuccess(result.user))

    dispatch(getUserFail("User Does Not Exists"))
   

  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};
