const dotenv = require("dotenv");
const mongoose = require("mongoose");

/*
General error handling for syncronus code.

! REMEMBER: it should be set in the beginning.

*/
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception");
  console.log("SHUTTING DOWN");
  process.exit(1);
});
/*
setting up the environment:

*/
dotenv.config({
  path: "./config/config.env",
});

const app = require("./app");

mongoose
  .connect(process.env.LIVE_DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Mongodb is connected successfully.");
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is started at port ${PORT}`);
});

// The error handler for all asynchronous codes.
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message),
    console.log("Unhandled error happened and shutting down ....");
  process.exit(1);
});

// HERE WILL BE THE DATABASE INTEGRATION ENDPOINT.
