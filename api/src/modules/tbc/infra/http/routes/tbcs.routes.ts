import { Router } from 'express';

import TbcsController from '../controllers/TbcsController';

const tbcsRouter = Router();

const tbcsController = new TbcsController();

tbcsRouter.post('/', tbcsController.create);

export default tbcsRouter;
