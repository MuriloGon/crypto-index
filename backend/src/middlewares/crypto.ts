import {Request, Response, NextFunction} from 'express';
import {ErrorResponse} from '../utils/errorsResponse';
import {updateCurrenciesSchema} from '../validations/crypto';

export async function validatePostBody(
    req: Request,
    res: Response,
    nex: NextFunction,
) {
  const {error} = updateCurrenciesSchema.validate(req.body);
  if (error) {
    const message = (error?.details[0].message);
    return res.status(400).json(ErrorResponse(message));
  }
  nex();
}
