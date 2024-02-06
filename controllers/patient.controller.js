import db from "../Models/index.js";
const Patient = db.patient;

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ medecinId: req.userId });
    if (!patients) res.status(404).send(" no patients found");
    res.send(patients);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    // Access the uploaded file from req.file
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Process the uploaded file (e.g., save to database or filesystem)
    // For demonstration, let's just send back the file details
    res.status(200).json({
      message: "File uploaded successfully!",
      filename: file.filename,
      path: file.path,
    });

    // // Access form data from request body
    // const { visitdate, rendezvous, bilan, images } = req.body;

    // // Handle the data as needed
    // console.log("Visit Date:", visitdate);
    // console.log("Next Appointment:", rendezvous);
    // console.log("Bilan File:", req.file); // Access uploaded bilan file
    // console.log("Images Files:", req.files); // Access uploaded images files

    // // Process the data and send a response
    // // res.json({ message: "Data received successfully!" });
    // // Handle file uploads
    // const bilanFile = req.files["bilan"][0];
    // const imagesFile = req.files["images"][0];

    // console.log(bilanFile);
    // console.log(imagesFile);

    // res.send({ message: "Test was successfull!" });
    // const patient = new Patient({
    //   medecinId: req.userId,
    //   Nom_p: req.body.Nom_p,
    //   Prenom_p: req.body.Prenom_p,
    //   Date_naissance: req.body.Date_naissance,
    //   Phone: req.body.Phone,
    //   Sexe: req.body.Sexe,
    //   SituationFamiliale: req.body.SituationFamiliale,
    //   Antecedants: req.body.Antecedants,
    // });
    // await patient.save(patient);
    // res.send({ message: "Patient was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    res.send(patient);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    patient.Nom_p = req.body.Nom_p;
    patient.Prenom_p = req.body.Prenom_p;
    patient.Date_naissance = req.body.Date_naissance;
    patient.Phone = req.body.Phone;
    patient.Sexe = req.body.Sexe;
    patient.SituationFamiliale = req.body.SituationFamiliale;
    patient.Antecedants = req.body.Antecedants;
    await patient.save(patient);
    res.send({ message: "Patient was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    await Patient.deleteOne(patient);
    res.send({ message: "Patient was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
