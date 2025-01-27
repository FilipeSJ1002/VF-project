import { Injectable, NestMiddleware } from '@nestjs/common';
import * as express from 'express';

interface User {
  id: string;
  email: string;
}

interface CustomRequest extends express.Request {
  user?: User;
  body: { ownerId?: string };
}

@Injectable()
export class OwnershipMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: express.Request, next: express.NextFunction) {
    if (req.user) {
      req.body.ownerId = req.user.id;
    }
    next();
  }
}
