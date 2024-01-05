import mongoose from "mongoose";

// Schéma pour les créneaux horaires disponibles


const RendezVous= mongoose.model(
  "Listerendezvous",
  new mongoose.Schema({
    patient_Id: {
        type: mongoose.Types.ObjectId,
        ref: "Patient",
        required:true,
    },
    heureRendezVous: {
         type: Date, 
         required: true },
    DateRendezVous: {
            type: Date, 
            required: true },
  }
    )
);

export default RendezVous ;