import {DefaultErrorResponse} from '../types/responses';

export function ErrorResponse(message: string): DefaultErrorResponse {
  return {message};
}
