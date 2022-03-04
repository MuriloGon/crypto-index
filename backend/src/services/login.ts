import {LoginRequestBody} from '../types/auth';
import {loginBody} from '../validations/login';
export async function login(body: LoginRequestBody): Promise<string|null> {
  const {error} = loginBody.validate(body);
  if (error !== undefined) return null;
  return '1234123412341234';
}
