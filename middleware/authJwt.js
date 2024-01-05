import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("token:", token);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = user.id;
    next();
  });
};

export default verifyToken;
