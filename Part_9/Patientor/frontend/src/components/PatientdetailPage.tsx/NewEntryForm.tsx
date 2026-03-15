import { Button, MenuItem, Select, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Diagnosis, EntryType, EntryWithoutId, PatientDetails } from '../../types';
import { useEffect, useState } from 'react';
import AddNewEntryButton from './AddNewEntryButton';
import NewHealthCheckEntryForm from './NewHealthCheckEntryForm';
import NewHospitalEntryForm from './NewHospitalEntryForm';
import NewOccupationalHealthcareEntryForm from './NewOccupationalHealthCareEntryForm';
import patientService from '../../services/patients';


const NewEntryForm = ({ diagnoses, setPatient }: { diagnoses: Diagnosis[]; setPatient: React.Dispatch<React.SetStateAction<PatientDetails | null>> }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formType, setFormType] = useState<EntryType>(EntryType.HealthCheck);
  const [entry, setEntry] = useState<EntryWithoutId | null>(null);
  const { id } = useParams<{ id: string }>();
  const resolvedId = id || '';
  let form:JSX.Element | null = null;

  useEffect(() => {
    if (entry === null) return;
    patientService.addEntry(resolvedId, entry)
      .then(() => {
        setDisplayForm(false);
        setEntry(null);
        setPatient((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            entries: [...prev.entries, { ...entry, id: 'temp-id' }]
          };
        });
      })
      .catch((error) => {
        console.error('Error adding entry:', error);
      });
  }, [entry, resolvedId, setPatient]);

  if (!displayForm) {
    return <AddNewEntryButton onClick={() => setDisplayForm(true)} />;
  }

  switch(formType) {
    case EntryType.HealthCheck:
      form = <NewHealthCheckEntryForm diagnoses={diagnoses} setEntry={setEntry} />; break;
    case EntryType.Hospital:
      form = <NewHospitalEntryForm diagnoses={diagnoses} setEntry={setEntry} />; break;
    case EntryType.OccupationalHealthcare:
      form = <NewOccupationalHealthcareEntryForm diagnoses={diagnoses} setEntry={setEntry} />; break;
    default:
      form = <div>Unknown entry type</div>;
  }

  return (
    <div>
      <Stack
        direction='column'
        spacing={2}
        padding={2}
        marginBottom={2}
        sx={{ border: '2px dotted grey' }}
      >
        <Select value={formType} onChange={(e) => setFormType(e.target.value as EntryType)}>
          {Object.values(EntryType).map((entryType) => (
            <MenuItem
              value={entryType}
              key={entryType}
            >
              NEW {entryType.toUpperCase()} ENTRY
            </MenuItem>
          ))}
        </Select>
          {form}
          <Button
            variant='contained'
            color='error'
            onClick={() => setDisplayForm(false)}
          >
            Cancel
          </Button>
      </Stack>
    </div>
  );
};

export default NewEntryForm;
