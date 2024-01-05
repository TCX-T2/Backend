import db from "../Models/index.js";

const Visite = db.visite;
const Patient = db.patient;
// const User = db.user;


export const getVisites = async (req, res) => {
  try {
    const visites = await Visite.find();
    res.send(visites);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addVisite = async (req, res) => 
{
        const patient = await Patient.findById(req.params.id);
        
        const visite = new Visite({
            patientId: patient.id,
            Numero_visite: req.body.Numero_visite,
            Date_visite: req.body.Date_visite,
            Motif_Consultation: req.body.Motif_Consultation,

            // Examen: req.body.Examen,
            // Diagnostic: req.body.Diagnostic,
            // Traitement: req.body.Traitement,
            // Prix: req.body.Prix,
        });
    visite
    .save(visite)
    .then((data) => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const getVisiteById = async (req, res) => 
{
  try {
    const visite = await Visite.findById(req.params.id);
    res.send(visite);
  } catch (err) {
      res.status(500).send({ message: err.message });
      }
}
export const deleteVisite = async (req, res) => {
  try{
      const visite = await Visite.findById(req.params.id);
      await visite.remove(visite);
      res.send({ message: "Visite was deleted successfully!" });
  }
  catch(err){
      res.status(500).send({ message: err.message });
  }
}