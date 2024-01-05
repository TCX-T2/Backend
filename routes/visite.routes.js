import express from "express";
import db from "../Models/index.js";
import verifyToken from "../middleware/authJwt.js";
import {
  getVisites,
  addVisite,
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

router.get("/:idP/all", getVisites);
router.post("/:idP/add", addVisite);
router.get("/:idP/:idV", getVisiteById);
router.put("/:idP/:idV", updateVisite);
router.delete("/:idP/:idV", deleteVisite);

export default router;