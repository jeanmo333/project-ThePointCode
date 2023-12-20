// custom functions
const { createNewUser, authenticateUser } = require("./controller");
const {
  sendOTPVerificationEmail,
} = require("./../email_verification_otp/controller");

const express = require("express");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
      throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    } else if (!new Date(dateOfBirth).getTime()) {
      throw Error("Invalid date of birth entered");
    } else if (password.length < 8) {
      throw Error("Password is too short!");
    } else {
      // valid credentials
      const newUser = await createNewUser({
        name,
        email,
        password,
        dateOfBirth,
      });
      const emailData = await sendOTPVerificationEmail(newUser);

      res.json({
        status: "PENDING",
        message: "Verification email sent",
        data: emailData,
      });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "")
      throw Error("Empty credentials supplied");

    const authenticatedUser = await authenticateUser(email, password);
    res.json({
      status: "SUCCESS",
      message: "Signin successful",
      data: authenticatedUser,
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

module.exports = router;
