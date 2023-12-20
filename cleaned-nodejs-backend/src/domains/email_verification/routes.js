const express = require("express");
const router = express.Router();
const { verifyEmail, resendVerificationEmail } = require("./controller");

// path for static verified page
const path = require("path");

// resend verification
router.post("/resend", async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) throw Error("Empty user details are not allowed");

    const emailData = await resendVerificationEmail(userId, email);

    res.json({
      status: "PENDING",
      message: "Verification email sent",
      data: emailData,
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

// Verify email
router.get("/:userId/:uniqueString", async (req, res) => {
  try {
    let { userId, uniqueString } = req.params;
    if (!userId || !uniqueString)
      throw Error("Empty user details are not allowed");

    await verifyEmail(userId, uniqueString);
    res.sendFile(path.join(__dirname, "./views/verified.html"));
  } catch (error) {
    res.redirect(
      `/email_verification/verified?error=true&message=${error.message}`
    );
  }
});

// Verified page route
router.get("/verified", (_, res) => {
  res.sendFile(path.join(__dirname, `./views/verified.html`));
});

module.exports = router;
