import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import User from "./user.schema.js";
import Patient from "./patient.schema.js";
import Visite from "./visite.schema.js";

const db = {};

db.mongoose = mongoose;

db.user = User;
db.patient = Patient;
db.visite = Visite;

export default db;
