import { Request, Response } from 'express';

class SessionsController {
  public async validate(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    return response.json({ status: 'ok' });
  }
}

export default SessionsController;
