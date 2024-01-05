import db from "../Models/index.js";
const Patient = db.patient;
const Visite = db.visite;
const User = db.user;

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ medecinId: req.userId });
    res.send(patients);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const patient = new Patient({
      medecinId: req.userId,
      Nom_p: req.body.Nom_p,
      Prenom_p: req.body.Prenom_p,
      Date_naissance: req.body.Date_naissance,
      Phone: req.body.Phone,
      Sexe: req.body.Sexe,
      SituationFamiliale: req.body.SituationFamiliale,
      Antecedants: req.body.Antecedants,
    });
    await patient.save(patient);
    res.send({ message: "Patient was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getPatientById = async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      res.send(patient);
    } catch (err) {
        res.status(500).send({ message: err.message });
        }
}

export const updatePatient = async (req, res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        patient.Nom_p = req.body.Nom_p;
        patient.Prenom_p = req.body.Prenom_p;
        patient.Date_naissance = req.body.Date_naissance;
        patient.Phone = req.body.Phone;
        patient.Sexe = req.body.Sexe;
        patient.SituationFamiliale = req.body.SituationFamiliale;
        patient.Antecedants = req.body.Antecedants;
        await patient.save(patient);
        res.send({ message: "Patient was updated successfully!" });
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}

export const deletePatient = async (req, res) => {
    try{
        const patient = await Patient.findById(req.params.id);
        await patient.remove(patient);
        res.send({ message: "Patient was deleted successfully!" });
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}