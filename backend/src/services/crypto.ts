import {readFile, writeFile} from 'fs/promises';
import {LocalCurrencies} from '../types/crypto';

export async function getLocalCurrencies(path: string) {
  try {
    const currencies: LocalCurrencies = JSON.parse(
        await readFile(path, {encoding: 'utf8'}),
    );
    return currencies;
  } catch (error) {
    return null;
  }
}

export function setCurrency(
    currencyCode: string, value:number, data: LocalCurrencies,
): LocalCurrencies | null {
  if (!['BRL', 'CAD', 'EUR'].includes(currencyCode) || value < 0) return null;

  const newData = data;
  newData[currencyCode as keyof(LocalCurrencies)] = value.toString();

  return newData;
}

export async function saveCurrency(
    path: string, data: LocalCurrencies,
): Promise<boolean> {
  try {
    await writeFile(path, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}
