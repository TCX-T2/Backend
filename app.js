import express from "express";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000; // set port number

app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
); // default route

import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

// import patientRouter from "./routes/patient.routes.js";
// app.use("/api/patients", patientRouter);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Marhaba..." });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); // start the server
