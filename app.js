const express = require("express");
const cors = require("cors");
const User = require("./model/user.model");
require("dotenv").config();
const initializeDBConnection = require("./db/dbconnect");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

initializeDBConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    console.log("enter", req.body);
    const { name, email } = req.body;
    const user = new User({
      name,
      email,
    });
    const result = await user.save();
    console.log(result, "result");
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
