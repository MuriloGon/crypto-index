import axios from 'axios';
import {CurrentPriceResponse} from '../types/crypto';

export async function fetchCurrencyPrices(
): Promise<CurrentPriceResponse | undefined> {
  const response = await axios
      .get<CurrentPriceResponse>(
          'https://api.coindesk.com/v1/bpi/currentprice/BTC.json',
      );
  return response.data;
}
