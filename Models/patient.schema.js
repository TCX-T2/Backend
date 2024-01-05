import mongoose from "mongoose";

const Patient = mongoose.model(
  "patient",
  new mongoose.Schema({
    medecinId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Nom_p: { type: String, required: true },
    Prenom_p: {
      type: String,
      required: true,
    },
    Date_naissance: {
      type: Date,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
      unique: true,
    },
    Sexe: {
      type: String,
      enum: ["Femme", "Homme"],
    },
    ListeVisite: [
      { type: mongoose.Types.ObjectId, ref: "Visite", default: [] },
    ],
    SituationFamiliale: {
      type: String,
      enum: ["Célibataire", "Marié", "Divorcé", "Veuf"],
    },
    Antecedants: {
      type: String,
    },
  })
);
export default Patient;
