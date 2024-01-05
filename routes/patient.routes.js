import express from "express";
import db from "../Models/index.js";
import verifyToken from "../middleware/authJwt.js";
import {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";
const Patient = db.patient;
const router = express.Router();

// router.post("/add", [verifyToken], addPatient);
// router.get("/all", [verifyToken], getPatients);
// router.get("/:id", [verifyToken], getPatientById);
// router.put("/:id", [verifyToken], updatePatient);
// router.delete("/:id", [verifyToken], deletePatient);

router.post("/add", addPatient);
router.get("/all", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
