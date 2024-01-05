import db from "../Models/index.js";
import otp from "otp";
import nodemailer from "nodemailer";
import pkg from 'google-auth-library';
const { google } = pkg;
const User = db.user;

// OTP
export const forgetPassword = async (req, res) => {
    const user = User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
  
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;
    const refreshToken = process.env.REFRESH_TOKEN;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
  
    const OTP = new otp({ secret: process.env.OTP_SECRET });
    const token = OTP.totp();
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.mail,
      subject: "Reset Password",
      html: `<h1>OTP: ${token}</h1>`,
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "OTP sent successfully" });
    });
  };