import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  // Implementation for fetching diagnoses
  return data;
};

export default { getDiagnoses };