import { Box } from '@mui/material';
import { Diagnosis, HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ratingColors : { [key: string]: string } = {
  "3": "#ef4444", // red
  "2": "#f59e0b", // amber
  "1": "#facc15", // yellow
  "0": "#22c55e"  // green
};

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  const diagnosisList = entry.diagnosisCodes?.map((code) => {
    return diagnoses.find((d) => d.code === code);
  });

  return (
    <div>
      <Box border={1} borderRadius={2} padding={2} marginBottom={2}>
        <p>
          {entry.date}
        </p>
        <p>
          {entry.description}
        </p>
        <FavoriteIcon style={{ color: ratingColors[entry.healthCheckRating] }} />
        {diagnosisList && (
          <ul>
            {diagnosisList &&
              diagnosisList.map(
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

export default HealthCheckEntryDetails;