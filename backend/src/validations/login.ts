import joi from 'joi';
import {LoginRequestBody} from '../types/auth';

export const loginBody = joi.object<LoginRequestBody>({
  email: joi.string().email({}).required(),
  password: joi.string().length(6).required(),
});
