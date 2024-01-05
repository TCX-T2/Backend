import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import db from "../Models/index.js";
import otp from "otp";
import nodemailer from "nodemailer";

const User = db.user;

export const signup = (req, res) => {
  // Save User to Database
  const user = new User({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Username: req.body.Username,
    mail: req.body.mail,
    password: bycrypt.hashSync(req.body.password, 8),
    Speciality: req.body.Speciality,
    PhoneNumber: req.body.PhoneNumber,
  });

  user
    .save(user)
    .then((data) => {
      jwt.sign(
        { id: user._id }, //
        process.env.JWT_SECRET_KEY,
        { expiresIn: 86400 }, // 24 hours
        (err, token) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }
          res.status(200).send({
            id: user._id,
            Username: user.Username,
            mail: user.mail,
            accessToken: token,
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ Username: req.body.Username }, { mail: req.body.Username }],
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 86400 }, // 24 hours
      (err, token) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        res.status(200).send({
          id: user._id,
          Username: user.Username,
          mail: user.mail,
          accessToken: token,
        });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({
      id: user._id,
      Username: user.Username,
      mail: user.mail,
      Speciality: user.Speciality,
      PhoneNumber: user.PhoneNumber,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.Nom = req.body.Nom;
    user.Prenom = req.body.Prenom;
    user.Username = req.body.Username;
    user.mail = req.body.mail;
    user.Speciality = req.body.Speciality;
    user.PhoneNumber = req.body.PhoneNumber;
    await user.save();
    res.status(200).send({
      id: user._id,
      Username: user.Username,
      mail: user.mail,
      Speciality: user.Speciality,
      PhoneNumber: user.PhoneNumber,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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
