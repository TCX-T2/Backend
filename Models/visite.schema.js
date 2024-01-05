import mongoose from "mongoose";

const Ordonnance=mongoose.Model("Ordonnance",new mongoose.Schema(
  {
    Visite_Id:{
      type: mongoose.Types.ObjectId,
      ref:"Visite",
      required:true,
    },
    Medicaments:[{
      Traitement: [{
        name: {
          type: String,
        },
        dosage: {
          type: Number,
        },
        duree: {
          type: Number,
        },
      }]
    }]
  }
))

const Visite= mongoose.Model("visites", new mongoose.Schema({
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
    default: Date.now,
  },
  Motif_Consultation: {
    type: String,
  },
  compte_rendu: {
    type: String,
  },
  Liste_images: [
    {
      type:Image,
    }
  ],
  rapport_generee: {
    type: String,
  },
}));

export {Visite,Ordonnance};
