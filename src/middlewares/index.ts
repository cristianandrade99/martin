import { ErrorRequestHandler, RequestHandler } from 'express';
import { serializeError } from 'serialize-error-cjs';

import logger from '../services/logger';

export const loggerMiddleware: RequestHandler = ({ body, method, params, path, query }, _, next) => {
  logger.info(`${method} ${path}`, { body, params, query });

  next();
};

export const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(404).json({ message: `Not found: ${req.originalUrl}` });
};

export const errorMiddleware: ErrorRequestHandler = (err, _, res) => {
  const serializedError = serializeError(err);

  logger.error(serializedError.message, serializedError);

  res.status(500).json(serializedError);
};
