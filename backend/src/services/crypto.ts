import {readFile, writeFile} from 'fs/promises';
import {LocalCurrencies} from '../types/crypto';


export function setCurrency(
    currencyCode: string, value:number, data: LocalCurrencies,
): LocalCurrencies | null {
  if (!['BRL', 'CAD', 'EUR'].includes(currencyCode) || value < 0) return null;

  const newData = data;
  newData[currencyCode as keyof(LocalCurrencies)] = value.toString();

  return newData;
}

