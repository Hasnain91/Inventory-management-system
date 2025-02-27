const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup!");
  }

  // Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please add a subject and a message.");
  }

  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res
      .status(200)
      .json({ success: true, message: "Email Sent Successfully." });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent. Please, try again.");
  }
});

module.exports = {
  contactUs,
};
