import db from "../Models/index.js";
const Visite = db.visite;
const Patient = db.patient;
const User = db.user;

export const getVisites = async (req, res) => {
  try {
    const visites = await Visite.find({ medecinId: req.userId });
    res.send(visites);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addVisite = async (req, res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        
        const visite = new Visite({
            medecinId: req.userId,
            patientId: req.params.id,
            Nom_p: patient.Nom_p,
            Prenom_p: patient.Prenom_p,
            Date_visite: req.body.Date_visite,
            Motif: req.body.Motif,
            Examen: req.body.Examen,
            Diagnostic: req.body.Diagnostic,
            Traitement: req.body.Traitement,
            Prix: req.body.Prix,
        });
