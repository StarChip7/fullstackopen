import Button from '@mui/material/Button/Button';
import { Diagnosis, EntryWithoutId, EntryType } from '../../types';
import FormControl from '@mui/material/FormControl/FormControl';
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import TextField from '@mui/material/TextField/TextField';
import Input from '@mui/material/Input/Input';
import { useState } from 'react';
import { Box, Stack } from '@mui/material';


const NewHospitalEntryForm = ({ diagnoses, setEntry }: { diagnoses: Diagnosis[]; setEntry: React.Dispatch<React.SetStateAction<EntryWithoutId | null>> }) => {
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[]>([]);
  
  return (
    <div>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const entry : EntryWithoutId = {
          type: EntryType.Hospital,
          description: formData.get('description') as string,
          date: formData.get('date') as string,
          specialist: formData.get('specialist') as string,
          diagnosisCodes: diagnosesCodes,
          discharge: {
            date: formData.get('dischargeDate') as string,
            criteria: formData.get('dischargeCriteria') as string
          }
        };
        setEntry(entry);
      }}>
      <Stack spacing={2}>
      <label htmlFor="description">Description</label>
      <TextField id="description" name='description' variant="standard" hiddenLabel />
      <label htmlFor="date">Date</label>
      <Input id="date" name='date' type='date' />
      <label htmlFor="specialist">Specialist</label>
      <TextField id="specialist" name='specialist' variant="standard" hiddenLabel />
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
      <label htmlFor="dischargeDate">Discharge Date</label>
      <Input id="dischargeDate" name='dischargeDate' type='date' />
      <label htmlFor="dischargeCriteria">Discharge Criteria</label>
      <TextField id="dischargeCriteria" name='dischargeCriteria' variant="standard" hiddenLabel />
      <Button variant='contained' color='primary' type='submit' >
        ADD
      </Button>
      </Stack>
      </Box>
    </div>
  );
};

export default NewHospitalEntryForm;