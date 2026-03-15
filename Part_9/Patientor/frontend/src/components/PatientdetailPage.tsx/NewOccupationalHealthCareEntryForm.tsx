import FormControl from '@mui/material/FormControl/FormControl';
import { Diagnosis, EntryWithoutId, EntryType } from '../../types';
import Stack from '@mui/material/Stack/Stack';
import Select from '@mui/material/Select/Select';
import TextField from '@mui/material/TextField/TextField';
import Input from '@mui/material/Input/Input';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { Box, FormControlLabel } from '@mui/material';

const NewOccupationalHealthCareEntryForm = ({
  diagnoses, setEntry
}: {
  diagnoses: Diagnosis[];
  setEntry: React.Dispatch<React.SetStateAction<EntryWithoutId | null>>;
}) => {
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[]>([]);
  const [disableSickLeave, setDisableSickLeave] = useState(true);

  return (
    <div>
      <Box component='form' onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const entry : EntryWithoutId = {
          type: EntryType.OccupationalHealthcare,
          description: formData.get('description') as string,
          date: formData.get('date') as string,
          specialist: formData.get('specialist') as string,
          diagnosisCodes: diagnosesCodes,
          employerName: formData.get('employerName') as string,
        };
        if (!disableSickLeave) {
          entry.sickLeave = {
            startDate: formData.get('sickLeaveStartDate') as string,
            endDate: formData.get('sickLeaveEndDate') as string
          };
        }
        setEntry(entry);
      }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack spacing={2}>
        <label htmlFor='description'>Description</label>
        <TextField
          id='description'
          name='description'
          variant='standard'
          hiddenLabel
        />
        <label htmlFor='date'>Date</label>
        <Input id='date' name='date' type='date' />
        <label htmlFor='specialist'>Specialist</label>
        <TextField
          id='specialist'
          name='specialist'
          variant='standard'
          hiddenLabel
        />
        <FormControl>
          <label htmlFor='diagnosisCodes'>Diagnosis Codes</label>
          <Select
            labelId='diagnosisCodes-label'
            id='diagnosisCodes'
            name='diagnosisCodes'
            multiple
            value={diagnosesCodes}
            onChange={(e) =>
              setDiagnosesCodes(
                Array.isArray(e.target.value)
                  ? e.target.value
                  : [e.target.value],
              )
            }
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                ({diagnosis.code}) {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* //employerName: string; sickLeave?: {startDate: string;endDate: string; */}
        <label htmlFor='employerName'>Employer Name</label>
        <TextField id='employerName' name='employerName' variant='standard' hiddenLabel />
        <FormControlLabel
          control={
            <Checkbox
              id='disableSickLeave'
              name='disableSickLeave'
              checked={disableSickLeave}
              onChange={(e) => setDisableSickLeave(e.target.checked)}
            />
          }
          label='Disable sick leave'
        />
        <label htmlFor='sickLeaveStartDate'>Sick Leave Start Date</label>
        <Input id='sickLeaveStartDate' name='sickLeaveStartDate' type='date' disabled={disableSickLeave} />
        <label htmlFor='sickLeaveEndDate'>Sick Leave End Date</label>
        <Input id='sickLeaveEndDate' name='sickLeaveEndDate' type='date' disabled={disableSickLeave} />
        <Button variant='contained' color='primary' type='submit'>
          ADD
        </Button>
      </Stack>
      </Box>
    </div>
  );
};

export default NewOccupationalHealthCareEntryForm;