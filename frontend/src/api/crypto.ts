import axios from 'axios';
import {BtcCurrencyPrices} from '../types';

export async function getBtcPrices(Authentication: string) {
  const baseURL = process.env.REACT_APP_BASE_API_URL;
    try {
      const response = await axios({
        method: 'get',
        url: '/api/crypto/btc',
        baseURL,
        headers: {Authentication}
      });
      const data = response.data as BtcCurrencyPrices;
      return data;
    } catch (error) {
        throw (error as any).response.data;
    }
}

export async function updatePrice(Authentication: string, data: {currency: string, value: number}) {
  const baseURL = process.env.REACT_APP_BASE_API_URL;

    try {
      const response = await axios({
        method: 'post',
        url: '/api/crypto/btc',
        baseURL,
        data,
        headers: {Authentication}
      });
      return response.data as {message: string}
    } catch (error) {
        throw (error as any).response.data;
    }
}
