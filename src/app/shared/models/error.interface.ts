import { StatusCodes } from 'http-status-codes';

export interface IError {
  code: string;
  message: string;
  messages?: Array<string>;
  status: StatusCodes;
  title: string;
}
