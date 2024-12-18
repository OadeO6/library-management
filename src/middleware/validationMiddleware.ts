import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { responseError } from '../errors/utils';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = schema.shape;

      if (body) {
        body.parse(req.body);
      }
      if (query) {
        query.parse(req.query);
      }
      if (params) {
        params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json(responseError('Invalid data', error));
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal Server Error'));
      }
    }
  };
}
