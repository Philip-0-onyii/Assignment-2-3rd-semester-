require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const User = require("./models/User");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.send("Birthday saved successfully 🎉");
  } catch (err) {
    res.send("Email already exists!");
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

cron.schedule("0 7 * * *", async () => {
  console.log("Running daily birthday check...");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const users = await User.find();

  users.forEach(user => {
    const dob = new Date(user.dob);
    if (dob.getDate() === day && dob.getMonth() + 1 === month) {
      transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: `Happy Birthday ${user.username}! 🎂`,
        html: `
          <h2>🎉 Happy Birthday ${user.username}! 🎉</h2>
          <p>Wishing you joy, success, and good health.</p>
          <p>Thank you for being part of our community ❤️</p>
        `
      });
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
