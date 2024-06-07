import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { JwtPayload, TokenExpiredError, verify } from 'jsonwebtoken';
import { HttpError } from '../errors';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'notasecrey';

export async function validationHandler(
  req: Request,
  res: Response,
  next: Function
) {
  const errorResults = validationResult(req);
  if (errorResults.isEmpty()) {
    return next();
  }

  const errors = errorResults
    .formatWith((err: any) => {
      return {
        field: err.path,
        message: err.msg,
      };
    })
    .array();

  const error = {
    name: 'Validation Error',
    message: errors[0].message,
  };
  console.error('Validation Error:', errors[0].message);

  return res.status(400).json({ error });
}

export function logger(req: Request, res: Response, next: Function) {
  console.log(`Request ${req.method.toUpperCase()} ${req.url} has been called`);
  next();
}

export function jwtInterceptor(req: Request, res: Response, next: Function) {
  const { url, headers } = req;
  const tokenPrefix = 'Bearer ';
  const publicRoutes = [
    '/',
    '/api-docs/',
    '/api/authenticate',
    '/api/register',
  ];

  if (!publicRoutes.some((route) => url.startsWith(route))) {
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader) {
      console.error(
        `Request ${req.url} has been blocked by not providing sufficient authorization credentials`
      );
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

export async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: Function
) {
  console.error(err);
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  } else if (err instanceof Error) {
    res.status(500).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
}
