import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export async function validationHandler(
  req: Request,
  res: Response,
  next: Function
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorResponse = errors
    .formatWith((err: any) => {
      return {
        field: err.path,
        message: err.msg,
      };
    })
    .array()
    .reduce(
      (
        acc: {
          field: string;
          message: string | string[];
        }[],
        err: { field: string; message: string }
      ) => {
        const idx = acc.findIndex((elem) => (elem.field = err.field));
        if (idx !== -1) {
          acc[idx] = {
            field: err.field,
            message: Array.isArray(acc[idx].message)
              ? [...acc[idx].message, err.message]
              : [acc[idx].message as string, err.message],
          };
        } else {
          acc.push(err);
        }
        return acc;
      },
      []
    );

  return res
    .status(400)
    .json({ cause: 'Validation Error', errors: errorResponse });
}
