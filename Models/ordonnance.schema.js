import mongoose from "mongoose";

const Ordonnance = mongoose.model(
  "visites",
  new mongoose.Schema({
    visiteId: {
      type: mongoose.Types.ObjectId,
      ref: "Visite",
    },
    Nom_Patient: {
      type: String,
    },
    Age_Patient: {
      type: Number,
    },
    Date_visite: {
      type: Date,
      default: Date.now,
    },

    Medicaments: [
      {
        name: {
          type: String,
        },
        dosage: {
          type: Number,
        },
        duree: {
          type: Number,
        },
      },
    ],
  })
);

export default Ordonnance;