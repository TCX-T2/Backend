import mongoose from "mongoose";

const Visite = mongoose.model(
  "visites",
  new mongoose.Schema({
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    Numero_visite: {
      type: Number,
    },
    Date_visite: {
      type: Date,
      required: true,
    },
    Motif_Consultation: {
      type: String,
    },
    
  })
);

export default Visite;
