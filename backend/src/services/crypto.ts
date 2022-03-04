import {readFile, writeFile} from 'fs/promises';
import {fetchCurrencyPrices} from '../models/crypto';
import {Currency, LocalCurrencies} from '../types/crypto';

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

export async function createCustomCurrencies(
    localCurrencies: LocalCurrencies,
    USDCurrency: Currency,
) {
  const transformedCurrency = (code: 'BRL'|'CAD'|'EUR') => (
    Number(localCurrencies[code]) * USDCurrency.rate_float
  );

  const createCurrency = (
      code: 'BRL'|'CAD'|'EUR', description: string): Currency => ({
    code,
    rate: transformedCurrency(code).toLocaleString('en'),
    description,
    rate_float: transformedCurrency(code),
  });

  return {
    BRL: createCurrency('BRL', 'Brazilian Real'),
    EUR: createCurrency('EUR', 'Euro'),
    CAD: createCurrency('CAD', 'Canadian Dollar'),
  };
}

export async function getCustomCurrenciesRates(path: string) {
  const currencyRates = await getLocalCurrencies(path);
  if (currencyRates === null) return null;
  const currenciesPrices = await fetchCurrencyPrices();


  const customCurrencies = await createCustomCurrencies(
      currencyRates, currenciesPrices.bpi.USD,
  );

  const output = currenciesPrices;
  output.bpi = {...output.bpi, ...customCurrencies};
  return output;
}

export async function updateLocalCurrency(
    code: 'BRL'|'CAD'|'EUR', value: number, path: string,
) {
  const localCurrencies = await getLocalCurrencies(path);
  if (localCurrencies=== null) return null;

  const newLocalCurrencies = setCurrency(code, value, localCurrencies);
  if (newLocalCurrencies === null) return null;

  const result = await saveCurrency(path, newLocalCurrencies);
  return result;
}
