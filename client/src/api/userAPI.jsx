import axios from "axios";

// const rootUrl = "http://localhost:5000/";

// const loginUrl = rootUrl + "user/login";
// const userProfileUrl = rootUrl + "user/get";
// const logoutUrl = rootUrl + "user/logout";
// const newAccessJWT = rootUrl + "token";

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("login", frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.createToken);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshToken })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        reject("Token not found");
      }
      const res = await axios.get("/get", {
        headers: { Authorization: accessJWT },
      });

      resolve(res.data);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const fetchNewAccessToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
      if (!refreshJWT) {
        reject("Token not found");
      }
      const res = await axios.get("/token", {
        headers: { Authorization: refreshJWT },
      });

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.createToken);
      }

      resolve(true);
    } catch (error) {
      if (error.message === "Request failed with status code 403")
        localStorage.removeItem("crmSite");
      reject(false);
    }
  });
};

export const userLogOut = async () => {
  try {
    await axios.delete("/logout", {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });
  } catch (error) {
    console.log(error);
  }
};
