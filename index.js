const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json()); 

app.get("/", async (req, res) => {
  //GET
  const all_user = await UserModel.find();
  res.send({ data: all_user });
});



app.post("/", async (req, res) => {
  // POST
  const { name, email, dob, address, country } = req.body;

  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    res.send({ msg: "User already exist, try login" });
  } else {
    const new_user = new UserModel({
      name,
      email,
      dob,
      address,
      country,
    });

    try {
      await new_user.save();
      res.send({ msg: "Data stored successfully" });
    } catch (error) {
      res.send({ msg: "Something went wrong" });
    }
  }
});

app.patch("/:id", async (req, res) => {
  //UPDATE

  const payload = req.body;
  const user_data = await UserModel.updateOne(
    { _id: req.params.id },
    { $set: payload }
  );

  // console.log("user_data", user_data);

  try {
    res.send(user_data);
  } catch (error) {
    res.send({ error: error });
  }
});

app.delete("/:id", async (req, res) => {
  //DELETE

  const user_data = await UserModel.deleteOne({ _id: req.params.id });
  res.send(user_data);
});

// app.post("/read", upload.single("file"), (req, res) => {
//   const file = req.file;

//   const data = fs.readFileSync(file.path);
//   parse(data, (err, records) => {
//     if (err) {
//       console.error(err);
//       return res
//         .status(400)
//         .json({ success: false, message: "An error occurred" });
//     }

//     return res.json({ data: records });
//   });
// });

// app.post("/profile", upload.single("avatar"), function (req, res, next) {
//   console.log(req.file);


// });

app.listen(3001, async () => {
  try {
    await connection;
    console.log("Connection to db successful");
  } catch (error) {
    console.log("Error Connecting to db");
    console.log(error);
  }

  console.log("Listening on PORT 3001");
});
