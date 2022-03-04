import axios from 'axios'
import {BtcCurrencyPrices} from './types'

export async function getBtcPrices(Authentication: string) {
  const baseURL = process.env.REACT_APP_BASE_API_URL
  console.log(baseURL)

    try {
      const response = await axios({
        method: 'get',
        url: '/api/crypto/btc',
        baseURL,
        headers: {Authentication}
      });
      return response.data as BtcCurrencyPrices
    } catch (error) {
        return (error as any).response.data as {message: string}
    }
}

export async function updatePrice(Authentication: string, data: {currency: string, value: number}) {
  const baseURL = process.env.REACT_APP_BASE_API_URL
  console.log(baseURL)

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
        return (error as any).response.data as {message: string}
    }
}
