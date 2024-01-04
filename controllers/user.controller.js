import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import doctor from '../Models/user.schema.js';
const User = doctor;

export const signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 8),
    })
        .then((user) => {
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            }); 
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
            });
        }
        )
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
}

export const signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'User Not found.' });
            }
            const passwordIsValid = bycrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password!',
                });
            }
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
}