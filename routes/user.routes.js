import express from "express";
import {
  signup,
  signin,
  getProfile,
  updateUser,
  forgetPassword,
} from "../controllers/user.controller.js";
import checkDuplicateUsernameOrEmail from "../middleware/verifyDuplicate.js";
import verifyToken from "../middleware/authJwt.js";
import db from "../Models/index.js";
const User = db.user;
const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);
router.get("/profile", [verifyToken], getProfile);
router.put("/profile", [verifyToken], updateUser);
router.post("/forgetPassword", forgetPassword);
router.post("/logout", (req, res) => {
  res.status(200).send({ accessToken: null });
});

router.get("/", async (req, res) => {
  // temporary route to get all users
  // get all users
  const users = await User.find({});
  res.send(users);
});

export default router;
