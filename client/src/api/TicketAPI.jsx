import axios from "axios";

//ticket api routes

export const getAllTickets = async () => {
  try {
    const result = await axios.get("/ticket", {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSingleTicket = async (_id) => {
  try {
    const result = await axios.get("/ticket/" + _id, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });

    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReplyTicket = async (_id, msgObj) => {
  try {
    const result = await axios.put("/ticket/" + _id, msgObj, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });

    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTicketStatusClosed = async (_id) => {
  try {
    const result = await axios.patch(
      "/ticket/close-ticket/" + _id,
      {},
      {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      }
    );

    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewTicket = async (formData) => {
  try {
    const result = await axios.post("/ticket/addticket", formData, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });

    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

// LOCAL

// const rootUrl = "http://localhost:5000";
// const ticketUrl = rootUrl + "/ticket/";
// const closeTicketUrl = rootUrl + "/ticket/close-ticket/";

// export const getAllTickets = async () => {
//   try {
//     const result = await axios.get(ticketUrl, {
//       headers: {
//         Authorization: sessionStorage.getItem("accessJWT"),
//       },
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getSingleTicket = async (_id) => {
//   try {
//     const result = await axios.get(ticketUrl + _id, {
//       headers: {
//         Authorization: sessionStorage.getItem("accessJWT"),
//       },
//     });

//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const updateReplyTicket = async (_id, msgObj) => {
//   try {
//     const result = await axios.put(ticketUrl + _id, msgObj, {
//       headers: {
//         Authorization: sessionStorage.getItem("accessJWT"),
//       },
//     });
//     return result.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const updateTicketStatusClosed = async (_id) => {
//   try {
//     const result = await axios.patch(
//       closeTicketUrl + _id,
//       {},
//       {
//         headers: {
//           Authorization: sessionStorage.getItem("accessJWT"),
//         },
//       }
//     );

//     return result.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const createNewTicket = async (formData) => {
//   try {
//     const result = await axios.post(ticketUrl + "/addticket", formData, {
//       headers: {
//         Authorization: sessionStorage.getItem("accessJWT"),
//       },
//     });

//     return result.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const updateDeleteTicket = async (_id) => {
//   try {
//     const result = await axios.delete(ticketUrl + _id, {
//       headers: {
//         Authorization: sessionStorage.getItem("accessJWT"),
//       },
//     });
//     return result
//   } catch (error) {
//     console.log(error)
//   }
// };
