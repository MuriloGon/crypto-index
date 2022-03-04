import joi from 'joi';
import {LoginRequestBody} from '../types/login';

export const loginBody = joi.object<LoginRequestBody>({
  email: joi.string().email({}).required(),
  password: joi.string().length(6).required(),
});
