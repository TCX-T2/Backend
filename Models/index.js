import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import User from "./user.schema.js";
import Patient from "./patient.schema.js";
import { Visite, Ordonnance } from "./visite.schema.js";
import RendezVous from "./rendezvous.schema.js";

const db = {};

db.mongoose = mongoose;

db.user = User;
db.patient = Patient;
db.visite = Visite;
db.RendezVous= RendezVous;
db.ordonnance = Ordonnance;

export default db;
