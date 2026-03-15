import { RequestHandler, Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient, Params } from '../types';
import { NewPatientSchema } from '../utils';

export const getPatientsController = (
  _req: unknown,
  res: Response<NonSensitivePatient[]>,
) => {
  res.send(patientsService.getNonSensitivePatients());
};

export const getPatientByIdController = (
  req: { params: { id: string } },
  res: Response,
) => {
  const patient = patientsService
    .getPatients()
    .find((p) => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
};

export const addPatientController: RequestHandler = (req, res: Response) => {
  const newPatientEntry = NewPatientSchema.parse(req.body);
  const newPatient = patientsService.addPatient(newPatientEntry);
  res.status(201).send(newPatient);
};

export const addEntryController: RequestHandler<Params, unknown, unknown> = (
  req,
  res: Response,
) => {
  const patientId = req.params.id;
  const patient = patientsService.getPatients().find((p) => p.id === patientId);
  if (!patient) {
    res.status(404).end({ error: 'Patient not found' });
  }
  try {
    const newEntry = patientsService.addEntry(patientId, req.body);
    res.status(201).send(newEntry);
  } catch (error) {
    res
      .status(400)
      .send({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
  }
};