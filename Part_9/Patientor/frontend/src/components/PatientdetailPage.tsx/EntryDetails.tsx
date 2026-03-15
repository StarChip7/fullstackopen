import { Diagnosis, Entry, EntryType } from '../../types';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthCheckDetails from './OccupationalHealthCheckDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  

  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <OccupationalHealthCheckDetails entry={entry} diagnoses={diagnoses} />
      );
    case EntryType.HealthCheck:
      return (
        <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};