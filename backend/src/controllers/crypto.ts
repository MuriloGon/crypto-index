import {Request, Response} from 'express';
import * as cryptoService from '../services/crypto';
import {ErrorResponse} from '../utils/errorsResponse';

const currenciesPath = process.env.CURRENCIES_PATH || 'data/currencies.json';

export async function getBtcCurrencies(req: Request, res: Response) {
  const customCurrenciesRate = await cryptoService.getCustomCurrenciesRates(
      currenciesPath,
  );

  if (customCurrenciesRate === null) {
    return res.status(500).json(ErrorResponse('Internal error'));
  }
  res.status(200).json(customCurrenciesRate);
}

export async function updateLocalCurrency(req: Request, res: Response) {
  const {currency: code, value} = req.body;

  const updateResponse = cryptoService.updateLocalCurrency(
      code,
      value,
      currenciesPath,
  );

  if (updateResponse === null) {
    return res.status(500).json(ErrorResponse('Internal error'));
  }
  res.status(200).json({message: 'Valor alterado com sucesso!'});
}
