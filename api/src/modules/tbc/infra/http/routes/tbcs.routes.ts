import { Router } from 'express';

import TbcController from '../controllers/TbcController';

const tbcRouter = Router();

const tbcController = new TbcController();

tbcRouter.get('/', tbcController.index);
tbcRouter.get('/:tbc_id', tbcController.show);
tbcRouter.post('/', tbcController.create);
tbcRouter.put('/:tbc_id', tbcController.update);
tbcRouter.delete('/:tbc_id', tbcController.delete);

export default tbcRouter;
