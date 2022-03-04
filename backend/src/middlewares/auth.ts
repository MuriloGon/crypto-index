import {Request, Response, NextFunction} from 'express';
import {ErrorResponse} from '../utils/errorsResponse';

const validateToken = (token:string) => {
  if (typeof(token) !== 'string'||
  token.length !== 16||
  !(/[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/.test(token))) {
    return false;
  }
  return true;
};

export async function authentication(
    req: Request,
    res: Response,
    nex: NextFunction,
) {
  const {authentication} = req.headers as any;

  if (validateToken(authentication) === false) {
    return res.status(401).json(ErrorResponse('Token inválido'));
  }
  nex();
}
