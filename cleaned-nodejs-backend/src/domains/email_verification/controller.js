const UserVerification = require("./model");
const User = require("./../user/model");
const hashData = require("./../../util/hashData");
const verifyHashedData = require("./../../util/verifyHashedData");
const sendEmail = require("./../../util/sendEmail");
const currentUrl = require("./../../util/currentUrl");

// unique string
const { v4: uuidv4 } = require("uuid");

const sendVerificationEmail = async ({ _id, email }) => {
  try {
    const uniqueString = uuidv4() + _id;

    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
        currentUrl + "email_verification/" + _id + "/" + uniqueString
      }>here</a> to proceed.</p>`,
    };

    const hashedUniqueString = await hashData(uniqueString);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newVerification.save();
    await sendEmail(mailOptions);
    return {
      userId: _id,
      email,
    };
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (userId, uniqueString) => {
  try {
    // ensure record exists
    const matchedVerificationRecords = await UserVerification.find({ userId });
    if (!matchedVerificationRecords.length) {
      let message =
        "Account record doesn't exist or has been verified already. Please sign up or log in.";
      throw Error(message);
    } else {
      const { expiresAt } = matchedVerificationRecords[0];
      const hashedUniqueString = matchedVerificationRecords[0].uniqueString;

      // checking for expired unique string
      if (expiresAt < Date.now()) {
        await UserVerification.deleteOne({ userId });
        // delete expired user
        await User.deleteOne({ _id: userId });
        let message = "Link has expired. Please sign up again.";
        throw Error(message);
      } else {
        const stringMatch = await verifyHashedData(
          uniqueString,
          hashedUniqueString
        );
        if (!stringMatch) {
          let message =
            "Invalid verification details passed. Check your inbox.";
          throw Error(message);
        } else {
          const verifiedUser = await User.updateOne(
            { _id: userId },
            { verified: true }
          );
          await UserVerification.deleteOne({ userId });
          return verifiedUser;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

const resendVerificationEmail = async (userId, email) => {
  // delete existing records and resend
  await UserVerification.deleteMany({ userId });
  const emailData = await sendVerificationEmail({ _id: userId, email });
  return emailData;
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
  resendVerificationEmail,
};
