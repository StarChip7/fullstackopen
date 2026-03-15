import express from "express";
import { getPatientByIdController, getPatientsController, addPatientController, addEntryController} from "../controllers/patientsControllers";

const patientsRouter = express.Router();

patientsRouter.get("/", getPatientsController);
patientsRouter.get("/:id", getPatientByIdController);
patientsRouter.post("/", addPatientController);
patientsRouter.post("/:id/entries", addEntryController);


export default patientsRouter;
