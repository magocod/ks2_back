import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(logger: Logger) {
  return function (req: Request, res: Response, next: NextFunction) {
    // console.log(`Request...`);
    logger.debug(`${req.method} ${req.url} ${req.ip}`);
    next();
  };
}
