import { useParams } from "react-router-dom";
import { PatientDetails } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import NewEntryForm from "./NewEntryForm";



const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const resolvedId = id ? id : '';
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(resolvedId);
      setPatient(patient);
    };
    void fetchPatient();
  }, [resolvedId]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
      <div>
        <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <TransgenderIcon />}</h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <h3>Entries</h3>
        <NewEntryForm diagnoses={diagnoses} setPatient={setPatient} />

        {patient.entries.length === 0 ? (
          <p>No entries</p>
        ) : (
          patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          ))
        )}
      </div>
    );
  };
export default PatientDetailsPage;