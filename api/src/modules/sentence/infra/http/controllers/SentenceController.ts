import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import DeleteSentenceService from '@modules/sentence/services/DeleteSentenceService';
import ListSentenceService from '@modules/sentence/services/ListSentenceService';
import ShowSentenceService from '@modules/sentence/services/ShowSentenceService';
import UpdateSentenceService from '@modules/sentence/services/UpdateSentenceService';

class SentenceController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { sentence_id } = request.params;

    const showSentence = container.resolve(ShowSentenceService);
    const sentence = await showSentence.execute({
      sentence_id,
    });

    return response.json(sentence);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSentence = container.resolve(ListSentenceService);
    const sentence = await listSentence.execute();

    return response.json(sentence);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { code, coligate, name, content, sentence_category_id, system_code } =
      request.body;

    const createSentence = container.resolve(CreateSentenceService);
    const sentence = await createSentence.execute({
      code,
      coligate,
      name,
      content,
      sentence_category_id,
      system_code,
    });

    return response.json(sentence);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sentence_id } = request.params;
    const { code, coligate, name, content, sentence_category_id, system_code } =
      request.body;

    const updateSentence = container.resolve(UpdateSentenceService);
    const tbc = await updateSentence.execute({
      id: sentence_id,
      code,
      coligate,
      name,
      content,
      sentence_category_id,
      system_code,
    });

    return response.json(tbc);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sentence_id } = request.params;

    const deleteSentence = container.resolve(DeleteSentenceService);
    await deleteSentence.execute({ sentence_id });

    return response.status(204).send();
  }
}

export default SentenceController;
