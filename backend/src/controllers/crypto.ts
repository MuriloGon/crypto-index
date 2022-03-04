import {Request, Response} from 'express';
import * as cryptoService from '../services/crypto';
import {ErrorResponse} from '../utils/errorsResponse';

export async function getBtcCurrencies(req: Request, res: Response) {
  const customCurrenciesRate = await cryptoService.getCustomCurrenciesRates(
      process.env.CURRENCIES_PATH || 'currencies.json',
  );

  if (customCurrenciesRate === null) {
    return res.status(500).json(ErrorResponse('Internal error'));
  }
  res.status(200).json(customCurrenciesRate);
}
