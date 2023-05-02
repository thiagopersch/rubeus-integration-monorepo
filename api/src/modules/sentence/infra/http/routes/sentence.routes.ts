import { Router } from 'express';
import SentenceController from '../controllers/SentenceController';

const sentenceRouter = Router();

const sentenceController = new SentenceController();

sentenceRouter.get('/', sentenceController.index);
sentenceRouter.get('/:sentence_id', sentenceController.show);
sentenceRouter.post('/', sentenceController.create);
sentenceRouter.put('/:sentence_id', sentenceController.update);
sentenceRouter.delete('/:sentence_id', sentenceController.delete);

export default sentenceRouter;
