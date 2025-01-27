import { User } from '../users/schema/Users.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User & { id: string; email: string };
    }
  }
}
