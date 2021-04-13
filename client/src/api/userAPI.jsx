import axios from "axios";

  export const userLogin = async (formData) => {
    try {
      const res = await axios.post("/user/login", formData);
  
      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.createToken);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshToken })
        );
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const fetchUser = async () => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return "Token not found";
      }
      const res = await axios.get("user/get", {
        headers: { Authorization: accessJWT },
      });
  
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const fetchNewAccessToken = async () => {
    try {
      const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
      if (!refreshJWT) {
        return "Token not found";
      }
      const res = await axios.get("/user/token", {
        headers: { Authorization: refreshJWT },
      });
  
      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.createToken);
      }
  
      return true;
    } catch (error) {
      if (error.message === "Request failed with status code 403")
        localStorage.removeItem("crmSite");
      return false;
    }
  };
  
  export const userLogOut = async () => {
    try {
      await axios.delete("/user/logout", {
        headers: { Authorization: sessionStorage.getItem("accessJWT") },
      });
    } catch (error) {
      console.log(error);
    }
  };
  

// LOCAL

// const rootUrl = "http://localhost:5000/";

// const loginUrl = rootUrl + "user/login";

// export const userLogin = async (formData) => {
//   try {
//     const res = await axios.post(loginUrl, formData);

//     if (res.data.status === "success") {
//       sessionStorage.setItem("accessJWT", res.data.createToken);
//       localStorage.setItem(
//         "crmSite",
//         JSON.stringify({ refreshJWT: res.data.refreshToken })
//       );
//     }
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchUser = async () => {
//   try {
//     const accessJWT = sessionStorage.getItem("accessJWT");
//     if (!accessJWT) {
//       return "Token not found";
//     }
//     const res = await axios.get(rootUrl + "user/get", {
//       headers: { Authorization: accessJWT },
//     });

//     return res.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const fetchNewAccessToken = async () => {
//   try {
//     const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
//     if (!refreshJWT) {
//       return "Token not found";
//     }
//     const res = await axios.get(rootUrl + "user/token", {
//       headers: { Authorization: refreshJWT },
//     });

//     if (res.data.status === "success") {
//       sessionStorage.setItem("accessJWT", res.data.createToken);
//     }

//     return true;
//   } catch (error) {
//     if (error.message === "Request failed with status code 403")
//       localStorage.removeItem("crmSite");
//     return false;
//   }
// };
