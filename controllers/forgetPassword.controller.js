import db from "../Models/index.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import nodemailer from "nodemailer";
const User = db.user;

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
};

export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate and save a unique JWT token for the user
    const token = generateToken({ userId: user._id });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Lien pour réinitialiser votre mot de passe</h1>
    <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe</p>
    <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
    <p>Le lien expirera dans 10 minutes</p>
    <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Handle token verification and password update
export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).send({ message: "Token expired" });
    }

    // crypt the new password
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    user.password = req.body.newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
