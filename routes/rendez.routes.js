import express from "express";
import db from "../Models/index.js";
import verifyToken from "../middleware/authJwt.js";

import {
  addrendez,
  deleterendez,
  updaterendez,
  showallrendez,
  getRendezvousByid,

} from "../controllers/rendez.controller.js";

// const Visite = db.visite;
const router = express.Router();

// router.post("/add", [verifyToken], addVisite);
// router.get("/all", [verifyToken], getVisites);
// router.get("/:id", [verifyToken], getVisiteById);
// router.put("/:id", [verifyToken], updateVisite);
// router.delete("/:id", [verifyToken], deleteVisite);

router.get("all/", showallrendez); //afficher tous les rendez vous
router.post("/:idP/add", addrendez); //ajouter un rendez vous a un patient donnée
router.get("/:idP/:idR", getRendezvousByid); //Afficher Un rendez vous propore a un tel patient 
router.put("/:idP/:idR", updaterendez); // Update Rendez vous <-> Changer 
router.delete("/:idP/:idR", deleterendez); 

export default router;