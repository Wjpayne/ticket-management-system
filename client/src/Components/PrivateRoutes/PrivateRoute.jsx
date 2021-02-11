import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../Login/LoginSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewAccessToken } from "../../api/userAPI";
import { getUserProfile } from '../../Pages/Dashboard/UserActions';
import { DefaultLayout } from "../Layout/DefaultLayout";

export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessToken();
      result && dispatch(loginSuccess());
    };
    !user._id && dispatch(getUserProfile())
    !sessionStorage.getItem("accessJWT") && localStorage.getItem("crmSite") && 
    updateAccessJWT();

    
    !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    
    
  }, [dispatch, isAuth, user._id]);

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" /> 
      }
    />
  );
};