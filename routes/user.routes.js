import express from "express";
import { signup, signin } from "../controllers/user.controller.js";
import verifySignUp from "../middleware/verifySignUp.js";
import doctor from "../Models/user.schema.js";
const router = express.Router();

router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);

router.get("/", async (req, res) => {
  // get all users
    const users = await doctor.find({});
    res.send(users);
    
});

export default router;
