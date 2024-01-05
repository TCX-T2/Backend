import express from "express";
import db from "../Models/index.js";
import verifyToken from "../middleware/authJwt.js";
import {
  getVisites,
  addVisite,
  getVisiteById,
  // updateVisite,
  deleteVisite,
} from "../controllers/visite.controller.js";

const Visite = db.visite;
const router = express.Router();

// router.post("/add", [verifyToken], addVisite);
// router.get("/all", [verifyToken], getVisites);
// router.get("/:id", [verifyToken], getVisiteById);
// router.put("/:id", [verifyToken], updateVisite);
// router.delete("/:id", [verifyToken], deleteVisite);

router.get("/all", getVisites);
router.post("/:id/add", addVisite);
 router.get("/:id", getVisiteById);
// router.put("/:id", updateVisite);
router.delete("/:id", deleteVisite);

export default router;