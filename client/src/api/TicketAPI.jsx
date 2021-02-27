import axios from "axios";




// export const getAllTickets = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await axios.get("/ticket", {
//         headers: {
//           Authorization: sessionStorage.getItem("accessJWT"),
//         },
//       });

//       resolve(result);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const getSingleTicket = (_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await axios.get("/ticket/" + _id, {
//         headers: {
//           Authorization: sessionStorage.getItem("accessJWT"),
//         },
//       });

//       resolve(result);
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// };

// export const updateReplyTicket = (_id, msgObj) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await axios.put("/ticket/" + _id, msgObj, {
//         headers: {
//           Authorization: sessionStorage.getItem("accessJWT"),
//         },
//       });

//       resolve(result.data);
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// };

// export const updateTicketStatusClosed = (_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await axios.patch(
//         "/ticket/close-ticket/" + _id,
//         {},
//         {
//           headers: {
//             Authorization: sessionStorage.getItem("accessJWT"),
//           },
//         }
//       );

//       resolve(result.data);
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// };

// export const createNewTicket = (frmData) => {
//   console.log("from api", frmData);
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await axios.post("/ticket/addticket", frmData, {
//         headers: {
//           Authorization: sessionStorage.getItem("accessJWT"),
//         },
//       });

//       resolve(result.data);
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// };

// LOCAL

const rootUrl = "http://localhost:5000"
const ticketUrl = rootUrl + "/ticket/";
const closeTicketUrl = rootUrl + "/ticket/close-ticket/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUrl+ _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(ticketUrl+ _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const createNewTicket = (formData) => {
  console.log("from api", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl + "/addticket", formData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};