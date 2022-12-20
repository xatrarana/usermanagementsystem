
const express = require("express");
const dbConn = require("../db/dbConn");

const port = process.env.PORT || 8000;


const app = express();

// for user
const { userRoutes } = require("../routes/userRoutes");
app.use(userRoutes);

const startServer = async () => {
  try {
    await dbConn();
    console.log("database connected");
    app.listen(port, () => {
      console.log(`server is listening at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
