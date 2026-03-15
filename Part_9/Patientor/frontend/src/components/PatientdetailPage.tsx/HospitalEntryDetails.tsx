import { Box } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  const diagnosisList = entry.diagnosisCodes?.map((code) => {
    return diagnoses.find((d) => d.code === code);
  });

  return (
    <div>
      <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
        <p>
          {entry.date} <LocalHospitalIcon />
        </p>
        <p>{entry.description}</p>
        <p>Discharge date: {entry.discharge.date}</p>
        <p>Discharge criteria: {entry.discharge.criteria}</p>
        {diagnosisList && (
          <ul>
            {diagnosisList.map(
              (d) =>
                d && (
                  <li key={d.code}>
                    {d.code} {d.name}
                  </li>
                ),
            )}
          </ul>
        )}
        {entry.specialist && <p>Diagnosed by: {entry.specialist}</p>}
      </Box>
    </div>
  );
};

export default HospitalEntryDetails;