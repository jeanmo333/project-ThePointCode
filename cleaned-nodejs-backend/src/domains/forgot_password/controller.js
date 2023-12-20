const PasswordReset = require("./model");
const User = require("./../user/model");
const hashData = require("./../../util/hashData");
const verifyHashedData = require("./../../util/verifyHashedData");
const sendEmail = require("./../../util/sendEmail");
// unique string
const { v4: uuidv4 } = require("uuid");

const requestPasswordReset = async (email, redirectUrl) => {
  try {
    // check if user exists with email.
    const matchedUsers = await User.find({ email });
    if (!matchedUsers.length) {
      throw Error("No account with the supplied email exists!");
    } else {
      if (!matchedUsers[0].verified) {
        throw Error("Email hasn't been verified yet. Check your inbox.");
      } else {
        // valid email, set reset email

        await sendPasswordResetEmail(matchedUsers[0], redirectUrl);
      }
    }
  } catch (error) {
    throw error;
  }
};

const sendPasswordResetEmail = async ({ _id, email }, redirectUrl) => {
  try {
    const resetString = uuidv4() + _id;
    await PasswordReset.deleteMany({ userId: _id });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Password Reset",
      html: `<p>We heard that you lost your password.</p> <p> Don't worry, use the link below to reset it.</p> <p> This link <b>expires in 60 minutes</b>. </p> <p>Press <a href=${
        redirectUrl + "/" + _id + "/" + resetString
      }>here</a> to proceed.</p>`,
    };

    const hashedResetString = await hashData(resetString);

    // set values in password reset collection
    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: hashedResetString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newPasswordReset.save();
    await sendEmail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

const resetUserPassword = async (userId, resetString, newPassword) => {
  try {
    // check if user exists with email.
    const matchedPasswordResetRecords = await PasswordReset.find({ userId });
    if (!matchedPasswordResetRecords.length) {
      throw Error("Password reset request not found.");
    } else {
      const { expiresAt } = matchedPasswordResetRecords[0];
      const hashedResetString = matchedPasswordResetRecords[0].resetString;

      if (expiresAt < Date.now()) {
        await PasswordReset.deleteOne({ userId });
        throw Error("Password reset link has expired.");
      } else {
        const stringMatch = await verifyHashedData(
          resetString,
          hashedResetString
        );
        if (!stringMatch) {
          throw Error("Invalid password reset details passed.");
        }
        {
          const hashedNewPassword = await hashData(newPassword);
          await User.updateOne(
            { _id: userId },
            { password: hashedNewPassword }
          );
          await PasswordReset.deleteOne({ userId });
          return
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { requestPasswordReset, resetUserPassword };
