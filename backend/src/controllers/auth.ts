import {Request, Response} from 'express';
import {LoginRequestBody} from '../types/auth';
import * as loginService from '../services/login';
import {ErrorResponse} from '../utils/errorsResponse';

type LoginReq = Request<{}, {}, LoginRequestBody>;

export async function login(req: LoginReq, res: Response) {
  const token = await loginService.login(req.body);
  if (token === null) {
    return res.status(400).json(ErrorResponse('Campos inválidos'));
  };

  return res.json({token});
}
