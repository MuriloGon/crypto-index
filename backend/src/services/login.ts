import {LoginRequestBody} from '../types/auth';
import {loginBody} from '../validations/login';
import {randomBytes} from 'crypto';

export function generateToken(charaters: number = 16): string {
  return randomBytes(48).toString('base64')
      .replace(/\+/g, '-',
      ).replace(/\//g, '_')
      .replace(/\=/g, '')
      .slice(0, charaters);
}

export async function login(body: LoginRequestBody): Promise<string|null> {
  const {error} = loginBody.validate(body);
  if (error !== undefined) return null;
  return '1234123412341234';
}
