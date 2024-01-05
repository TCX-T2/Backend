import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  addrendez,
  deleterendez,
  updaterendez,
  showallrendez,
  getRendezvousByid,
} from "../controllers/rendez.controller.js";
const router = express.Router();

router.get("all/", [verifyToken], showallrendez); //afficher tous les rendez vous
router.post("/:idP/add", [verifyToken], addrendez); //ajouter un rendez vous a un patient donnée
router.get("/:idP/:idR", [verifyToken], getRendezvousByid); //Afficher Un rendez vous propore a un tel patient
router.put("/:idP/:idR", [verifyToken], updaterendez); // Update Rendez vous <-> Changer
router.delete("/:idP/:idR", [verifyToken], deleterendez);

export default router;
