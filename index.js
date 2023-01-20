const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");
const multer = require("multer");
const { userRouter } = require("./routes/user.route");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json()); 

app.use('/', userRouter)



app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection to db successful");
  } catch (error) {
    console.log("Error Connecting to db");
    console.log(error);
  }

  console.log("Listening on PORT 3001");
});
