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

router.post("/add", [verifyToken], addPatient);
router.get("/all", [verifyToken], getPatients);
router.get("/:id", [verifyToken], getPatientById);
router.put("/:id", [verifyToken], updatePatient);
router.delete("/:id", [verifyToken], deletePatient);

export default router;
