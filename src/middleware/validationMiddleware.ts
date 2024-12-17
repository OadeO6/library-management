import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

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
      console.log(error)
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}
