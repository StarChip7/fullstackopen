import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v4 as uuid } from 'uuid';
import { parseEntry } from "../utils";

const getPatients = (): Patient[] => {
  // Implementation for fetching patients
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };
  data.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: unknown) => {
  const patient = data.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const parsedEntry = parseEntry(entry);

  const newEntry = { ...parsedEntry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getNonSensitivePatients, addPatient, addEntry };