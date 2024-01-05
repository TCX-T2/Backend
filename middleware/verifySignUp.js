import doctor from '../Models/user.schema.js';
const User = doctor;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
        Username: req.body.Username,
        },
    }).then((user) => {
        if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!",
        });
        return;
        }
    
        // Email
        User.findOne({
        where: {
            mail: req.body.mail,
        },
        }).then((user) => {
        if (user) {
            res.status(400).send({
            message: "Failed! Email is already in use!",
            });
            return;
        }
    
        next();
        });
    });
    };

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
