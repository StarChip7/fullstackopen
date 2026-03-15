import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';
import { Response } from 'express';


export const getDiagnosesController = (_req: unknown, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
};