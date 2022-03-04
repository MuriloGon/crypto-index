import {LoginRequestBody} from '../types/auth';
import {loginBody} from '../validations/login';
import randToken from 'rand-token';

export function generateToken(charaters: number = 16): string {
  return randToken.generate(charaters);
}

export async function login(body: LoginRequestBody): Promise<string|null> {
  const {error} = loginBody.validate(body);
  if (error !== undefined) return null;
  return generateToken();
}
