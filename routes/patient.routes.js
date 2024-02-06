import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../temp/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid name conflicts
  }
});

const upload = multer({ storage: storage });

router.post("/add", [verifyToken], upload.single("file"), addPatient);
router.get("/all", [verifyToken], getPatients);
router.get("/:id", [verifyToken], getPatientById);
router.put("/:id", [verifyToken], updatePatient);
router.delete("/:id", [verifyToken], deletePatient);

export default router;
