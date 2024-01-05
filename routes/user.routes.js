import express from "express";
import { signup, signin } from "../controllers/user.controller.js";
import checkDuplicateUsernameOrEmail from "../middleware/verifyDuplicate.js";
import db from "../Models/index.js";
const User = db.user;
const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);

router.get("/", async (req, res) => {
  // get all users
  const users = await User.find({});
  res.send(users);
});

export default router;
