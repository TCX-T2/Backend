import express from "express";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
import responseHandler from "./middleware/addToHistory.js";
import verifyToken from "./middleware/authJwt.js";

dotenv.config();

const app = express();
// Apply the responseHandler middleware globally
app.use(verifyToken, responseHandler);

const port = process.env.PORT || 5000; // set port number

app.use(express.json());

connectDb();

import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

import patientRouter from "./routes/patient.routes.js";
app.use("/patients", patientRouter);

import visiteRouter from "./routes/visite.routes.js";
app.use("/visites/", visiteRouter);

import ordonnanceRouter from "./routes/ordannance.routes.js";
app.use("/ordonnances/", ordonnanceRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Marhaba..." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); // start the server
