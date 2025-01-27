import { NestMiddleware } from '@nestjs/common';
import * as express from 'express';
interface User {
    id: string;
    email: string;
}
interface CustomRequest extends express.Request {
    user?: User;
    body: {
        ownerId?: string;
    };
}
export declare class OwnershipMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: express.Request, next: express.NextFunction): void;
}
export {};
