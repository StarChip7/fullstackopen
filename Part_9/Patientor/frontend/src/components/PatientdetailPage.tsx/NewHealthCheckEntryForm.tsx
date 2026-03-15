import { Button, FormControl, Input, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Diagnosis, EntryType , EntryWithoutId } from '../../types';
import { useState } from 'react';

const NewHealthCheckEntryForm = ({ diagnoses, setEntry }: { diagnoses: Diagnosis[]; setEntry: React.Dispatch<React.SetStateAction<EntryWithoutId | null>> }) => {

  const [diagnosesCodes, setDiagnosesCodes] = useState<string[]>([]);

  return (
    <Box
      component='form'
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const entry : EntryWithoutId = {
          type: EntryType.HealthCheck,
          description: formData.get('description') as string,
          date: formData.get('date') as string,
          specialist: formData.get('specialist') as string,
          healthCheckRating: parseInt(formData.get('healthCheckRating') as string),
          diagnosisCodes: diagnosesCodes
        };
        console.log(entry);
        setEntry(entry);
      }}
    >
      <label htmlFor="description">Description</label>
      <TextField id="description" name='description' variant="standard" hiddenLabel />
      <label htmlFor="date">Date</label>
      <Input id="date" name='date' type='date' />
      <label htmlFor="specialist">Specialist</label>
      <TextField id="specialist" name='specialist' variant="standard" hiddenLabel />
      <FormControl>
       <label htmlFor="healthCheckRating">Health Check Rating</label>
       <Input id="healthCheckRating" name='healthCheckRating' type='number' inputProps={{ min: 0, max: 3 }} />
      </FormControl>
      <FormControl>
        <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
        <Select labelId="diagnosisCodes-label" id="diagnosisCodes" name='diagnosisCodes' multiple value={diagnosesCodes} onChange={(e) => setDiagnosesCodes(Array.isArray(e.target.value) ? e.target.value : [e.target.value])}>
           {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              ({diagnosis.code}) {diagnosis.name}
            </MenuItem>
           ))}
        </Select>
      </FormControl>
      <Button variant='contained' color='primary' type='submit'>
        ADD
      </Button>
    </Box>
  );
};

export default NewHealthCheckEntryForm;