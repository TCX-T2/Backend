import express from "express";
import db from "../Models/index.js";
import verifyToken from "../middleware/authJwt.js";
import {
  addVisite,
  getVisites,
  getVisiteById,
  updateVisite,
  deleteVisite,
} from "../controllers/visite.controller.js";

const Visite = db.visite;
const router = express.Router();

// router.post("/add", [verifyToken], addVisite);
// router.get("/all", [verifyToken], getVisites);
// router.get("/:id", [verifyToken], getVisiteById);
// router.put("/:id", [verifyToken], updateVisite);
// router.delete("/:id", [verifyToken], deleteVisite);

router.post("/add", addVisite);
router.get("/all", getVisites);
router.get("/:id", getVisiteById);
router.put("/:id", updateVisite);
router.delete("/:id", deleteVisite);

export default router;