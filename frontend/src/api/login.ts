import axios from 'axios'

export async function login(data: {email: string, password: string}) {
  const baseURL = process.env.REACT_APP_BASE_API_URL
    try {
      const response = await axios({
        method: 'post',
        url: '/api/login',
        baseURL,
        data,

      });
      return response.data
    } catch (error) {
        throw (error as any).response.data
    }
}
