// import { NewPatient, Gender } from './types';
import zod from 'zod';
import { Gender, EntryType } from './types';

// const toNewPatientEntry = (object: unknown): NewPatient => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Invalid input: not an object');
//   }

//   const requiredFields = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];
//   for (const field of requiredFields) {
//     if (!(field in object)) {
//       throw new Error(`Missing field: ${field}`);
//     }
//   }

//   const { name, dateOfBirth, ssn, gender, occupation } = object as { [key: string]: unknown };

//   return {
//     name : parseName(name),
//     dateOfBirth: parseDate(dateOfBirth),
//     ssn : parseSSN(ssn),
//     gender: parseGender(gender),
//     occupation: parseOccupation(occupation)
//   };};

// export { toNewPatientEntry };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error('Invalid name: ' + name);
//   }
//   return name;
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error('Invalid date: ' + date);
//   }
//   return date;
// };

// const parseSSN = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error('Invalid SSN: ' + ssn);
//   }
//   return ssn;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error('Invalid gender: ' + gender);
//   }
//   return gender;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('Invalid occupation: ' + occupation);
//   }
//   return occupation;
// };

// const isString = (text: unknown): text is string => {
//  return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (gender: string): gender is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(gender);
// };

export const NewPatientSchema = zod.object({
  name: zod.string(),
  dateOfBirth: zod.string().refine(date => Boolean(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  ssn: zod.string(),
  gender: zod.enum(Gender),
  occupation: zod.string(),
});

export const NewEntryBaseSchema = zod.object({
  date: zod.string().refine(date => Boolean(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  specialist: zod.string(),
  description: zod.string(),
  diagnosisCodes: zod.array(zod.string()).optional(),
});

export const NewHealthCheckEntrySchema = NewEntryBaseSchema.extend({
  type: zod.literal(EntryType.HealthCheck),
  healthCheckRating: zod.number().min(0).max(3),
});

export const NewOccupationalHealthcareEntrySchema = NewEntryBaseSchema.extend({
  type: zod.literal(EntryType.OccupationalHealthcare),
  employerName: zod.string(),
});

export const NewHospitalEntrySchema = NewEntryBaseSchema.extend({
  type: zod.literal(EntryType.Hospital),
  discharge: zod.object({
    date: zod.string().refine(date => Boolean(Date.parse(date)), {
      message: 'Invalid date format'
    }),
    criteria: zod.string(),
  }),
});

export const parseEntry = (entry: unknown) => {
  if (!entry || typeof entry !== 'object' || !('type' in entry)) {
    throw new Error('Invalid entry: missing type');
  }

  switch (entry.type) {
    case 'HealthCheck':
      return NewHealthCheckEntrySchema.parse(entry);
    case 'OccupationalHealthcare':
      return NewOccupationalHealthcareEntrySchema.parse(entry);
    case 'Hospital':
      return NewHospitalEntrySchema.parse(entry);
    default:
      throw new Error(`Invalid entry type: ${entry.type}`);
  }
};