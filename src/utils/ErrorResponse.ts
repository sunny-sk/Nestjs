import { HttpStatus } from '@nestjs/common';
import { Error } from './Error';

export const NOT_FOUND = (message: string) => {
  throw new Error(false, message, HttpStatus.NOT_FOUND);
};

export const SERVER_ERROR = (message: string) => {
  throw new Error(false, message, HttpStatus.INTERNAL_SERVER_ERROR);
};

export const BAD_REQUEST = (message: string) => {
  throw new Error(false, message, HttpStatus.BAD_REQUEST);
};

export const ALREADY_EXIST = (message: string) => {
  throw new Error(false, message, HttpStatus.CONFLICT);
};
