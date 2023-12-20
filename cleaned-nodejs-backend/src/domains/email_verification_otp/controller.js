const UserOTPVerification = require("./model");
const User = require("./../user/model");
const hashData = require("./../../util/hashData");
const verifyHashedData = require("./../../util/verifyHashedData");
const sendEmail = require("./../../util/sendEmail");
const generateOTP = require("./../../util/generateOTP");

const sendOTPVerificationEmail = async ({ _id, email }) => {
  try {
    const otp = await generateOTP();

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process.</p><p>This link <b>expires in 1 hour</b>.`,
    };

    const hashedOTP = await hashData(otp);
    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    await sendEmail(mailOptions);
    return {
      userId: _id,
      email,
    };
  } catch (error) {
    throw error;
  }
};

const verifyOTPEmail = async (userId, otp) => {
  try {
    // ensure record exists
    const matchedOTPVerificationRecords = await UserOTPVerification.find({
      userId,
    });
    if (!matchedOTPVerificationRecords.length) {
      let message =
        "Account record doesn't exist or has been verified already. Please sign up or log in.";
      throw Error(message);
    } else {
      const { expiresAt } = matchedOTPVerificationRecords[0];
      const hashedOTP = matchedOTPVerificationRecords[0].otp;

      // checking for expired unique string
      if (expiresAt < Date.now()) {
        await UserOTPVerification.deleteOne({ userId });
        throw Error("Code has expired. Please request again.");
      } else {
        const validOTP = await verifyHashedData(otp, hashedOTP);
        if (!validOTP) {
          throw Error("Invalid code passed. Check your inbox.");
        } else {
          const verifiedUser = await User.updateOne(
            { _id: userId },
            { verified: true }
          );
          await UserOTPVerification.deleteMany({ userId });
          return verifiedUser;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

const resendOTPVerificationEmail = async (userId, email) => {
  // delete existing records and resend
  await UserOTPVerification.deleteMany({ userId });
  const emailData = await sendOTPVerificationEmail({ _id: userId, email });
  return emailData;
};

module.exports = {
  verifyOTPEmail,
  sendOTPVerificationEmail,
  resendOTPVerificationEmail,
};
