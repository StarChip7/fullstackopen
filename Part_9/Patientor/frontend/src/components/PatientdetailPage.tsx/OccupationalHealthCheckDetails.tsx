import { Box, Stack } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Work } from "@mui/icons-material";

const OccupationalHealthCheckDetails = (props:{entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
  const { entry, diagnoses } = props;
  const diagnosisList = entry.diagnosisCodes?.map((code) => {
    return diagnoses.find((d) => d.code === code);
  });

  return (
    <div>
      <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
              <Stack direction='row'><p>{entry.date} </p><Work /><p>{entry.employerName}</p></Stack>
              <p>{entry.description}</p>
              {entry.sickLeave && (
                <div>
                  <p>Sick leave start: {entry.sickLeave.startDate}</p>
                  <p>Sick leave end: {entry.sickLeave.endDate}</p>
                </div>
              )}
              <ul>
                {diagnosisList && diagnosisList.map(
                (d) =>
                  d && (
                    <li key={d.code}>
                      {d.code} {d.name}
                    </li>
                  ),
              )}
              </ul>
              
              {entry.specialist && <p>Diagnosed by: {entry.specialist}</p>}
              </ Box>
            </div>
  );
};

export default OccupationalHealthCheckDetails;