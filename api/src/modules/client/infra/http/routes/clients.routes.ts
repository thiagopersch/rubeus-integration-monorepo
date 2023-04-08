import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.get('/', clientsController.index);
clientsRouter.post('/', clientsController.create);
clientsRouter.put('/:client_id', clientsController.update);

export default clientsRouter;
