import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import doctor from "../Models/user.schema.js";
import { Op } from "sequelize";

export const signup = (req, res) => {
  // Save User to Database
  doctor.create({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Username: req.body.Username,
    mail: req.body.mail,
    password: bycrypt.hashSync(req.body.password, 8),
    Speciality: req.body.Speciality,
    PhoneNumber: req.body.PhoneNumber,
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        Username: user.Username,
        mail: user.mail,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = async (req, res) => {
  try {
    const user = await doctor.findOne({
        where: {
            [Op.or]: [{ Username: req.body.Username }, { mail: req.body.Username }],
        },
        });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not found.", req: req.body.Username });
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
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user.id,
      Username: user.Username,
      mail: user.mail,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
