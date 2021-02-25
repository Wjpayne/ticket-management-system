const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path")
// Express running app
app.use(express.static(path.join(__dirname, "client", "build")))
//API security
app.use(helmet());
//handle cors
//MONGO_DB setup
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});



if (process.env.NODE_ENV !== "production") {
  const mongoDB = mongoose.connection;

  mongoDB.on("open", () => {
    console.log("MongoDB is connected");
  });
  mongoDB.on("error", (error) => {
    console.log(error);
  });


//logger
app.use(morgan("combined"));
}
//set body parser
app.use(express.json());
//load routers

const userRouter = require("./Routes/UserRoute");
const ticketRouter = require("./Routes/TicketRoute");
const tokenRouter = require("./Routes/TokenRoute")

//routes

app.use("/user", userRouter);
app.use("/ticket", ticketRouter);
app.use("/token", tokenRouter);



//error handling
const handleError = require("./utils/ErrorHandler");

app.use((req, res, next) => {
  const error = new Error("Nothing here!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('/*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
  console.log({ port });
});
