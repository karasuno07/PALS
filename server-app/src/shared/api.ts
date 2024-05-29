import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { JwtPayload, TokenExpiredError, verify } from 'jsonwebtoken';

export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'ACCESSTOKENSECRET';

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

export function logger(req: Request, res: Response, next: Function) {
  console.log(`Request ${req.url} has been called`);
  next();
}

export function jwtInterceptor(req: Request, res: Response, next: Function) {
  const { url, headers } = req;
  const tokenPrefix = 'Bearer ';
  const publicRoutes = ['/api/authenticate', '/api/register'];

  if (!publicRoutes.includes(url)) {
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader) {
      res.status(403).json({
        error: {
          name: 'Access Denied',
          message: 'You do not have permisson to view/modify this resource',
        },
      });
    } else {
      const token = authorizationHeader.substring(tokenPrefix.length);
      try {
        const decoded = verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
        const username = decoded.username;
        console.log(
          `User ${username} has authenticated succesfully at ${new Date().toISOString()}`
        );
        next();
      } catch (err: unknown) {
        if (err instanceof TokenExpiredError) {
          res.status(401).json({ error: { ...err } });
        } else if (err instanceof Error) {
          res.status(400).json({
            error: {
              error: err.name,
              message: err.message,
            },
          });
        } else {
          res.status(500).json({
            error: {
              name: 'Internal Server Error',
            },
          });
        }
      }
    }
  } else {
    next();
  }
}
