import { Router } from 'express';

import SentenceCategoryController from '../controllers/SentenceCategoryController';

const sentenceCategoryRouter = Router();

const sentenceCategoryController = new SentenceCategoryController();

sentenceCategoryRouter.get('/', sentenceCategoryController.index);
sentenceCategoryRouter.get(
  '/:sentence_category_id',
  sentenceCategoryController.show,
);
sentenceCategoryRouter.post('/', sentenceCategoryController.create);
sentenceCategoryRouter.put(
  '/:sentence_category_id',
  sentenceCategoryController.update,
);
sentenceCategoryRouter.delete(
  '/:sentence_category_id',
  sentenceCategoryController.delete,
);

export default sentenceCategoryRouter;
