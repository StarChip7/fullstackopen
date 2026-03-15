import express from 'express';
import { getDiagnosesController } from '../controllers/diagnosesControllers';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', getDiagnosesController);

export default diagnosisRouter;