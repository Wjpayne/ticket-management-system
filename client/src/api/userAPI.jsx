import axios from "axios";




export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/user/login", frmData);

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
      const res = await axios.get("/user/get", {
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
      const res = await axios.get("/user/token", {
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
    await axios.delete("/user/logout", {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });
  } catch (error) {
    console.log(error);
  }
};




//LOCAL

// const rootUrl = "http://localhost:5000/";

// const loginUrl = rootUrl + "user/login";

// export const userLogin = (frmData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await axios.post(loginUrl, frmData);

//       resolve(res.data);

//       if (res.data.status === "success") {
//         sessionStorage.setItem("accessJWT", res.data.createToken);
//         localStorage.setItem(
//           "crmSite",
//           JSON.stringify({ refreshJWT: res.data.refreshToken })
//         );
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const fetchUser = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const accessJWT = sessionStorage.getItem("accessJWT");
//       if (!accessJWT) {
//         reject("Token not found");
//       }
//       const res = await axios.get(rootUrl + "/user/get", {
//         headers: { Authorization: accessJWT },
//       });

//       resolve(res.data);
//     } catch (error) {
//       reject(error.message);
//     }
//   });
// };

// export const fetchNewAccessToken = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
//       if (!refreshJWT) {
//         reject("Token not found");
//       }
//       const res = await axios.get(rootUrl + "/user/token", {
//         headers: { Authorization: refreshJWT },
//       });

//       if (res.data.status === "success") {
//         sessionStorage.setItem("accessJWT", res.data.createToken);
//       }

//       resolve(true);
//     } catch (error) {
//       if (error.message === "Request failed with status code 403")
//         localStorage.removeItem("crmSite");
//       reject(false);
//     }
//   });
// };

// export const userLogOut = async () => {
//   try {
//     await axios.delete(rootUrl + "/user/logout", {
//       headers: { Authorization: sessionStorage.getItem("accessJWT") },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
