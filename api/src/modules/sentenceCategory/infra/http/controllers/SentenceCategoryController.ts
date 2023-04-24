import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSentenceCategoryService from '@modules/sentenceCategory/services/CreateSentenceCategoryService';
import ShowSentenceCategoryService from '@modules/sentenceCategory/services/ShowSentenceCategoryService';
import ListSentenceCategoryService from '@modules/sentenceCategory/services/ListSentenceCategoryService';
import UpdateSentenceCategoryService from '@modules/sentenceCategory/services/UpdateSentenceCategoryService';
import DeleteSentenceCategoryService from '@modules/sentenceCategory/services/DeleteSentenceCategoryService';

class SentenceCategoryController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { sentence_category_id } = request.params;

    const showSentenceCategory = container.resolve(ShowSentenceCategoryService);
    const sentenceCategory = await showSentenceCategory.execute({
      sentence_category_id,
    });

    return response.json(sentenceCategory);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSentenceCategory = container.resolve(ListSentenceCategoryService);
    const sentenceCategory = await listSentenceCategory.execute();

    return response.json(sentenceCategory);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, status } = request.body;

    const createSentenceCategory = container.resolve(
      CreateSentenceCategoryService,
    );
    const sentenceCategory = await createSentenceCategory.execute({
      name,
      description,
      status,
    });

    return response.json(sentenceCategory);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sentence_category_id } = request.params;
    const { name, description, status } = request.body;

    const updateSentenceCategory = container.resolve(
      UpdateSentenceCategoryService,
    );
    const tbc = await updateSentenceCategory.execute({
      id: sentence_category_id,
      name,
      description,
      status,
    });

    return response.json(tbc);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sentence_category_id } = request.params;

    const deleteSentenceCategory = container.resolve(
      DeleteSentenceCategoryService,
    );
    await deleteSentenceCategory.execute({ sentence_category_id });

    return response.status(204).send();
  }
}

export default SentenceCategoryController;
