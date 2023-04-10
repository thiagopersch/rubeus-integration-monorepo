import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.get('/', clientsController.index);
clientsRouter.get('/:client_id', clientsController.show);
clientsRouter.post('/', clientsController.create);
clientsRouter.put('/:client_id', clientsController.update);
clientsRouter.delete('/:client_id', clientsController.delete);

export default clientsRouter;
