import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

interface User {
  id: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: User }>();

    const authHeader: string | undefined = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token ausente no cabeçalho');
    }

    try {
      const decoded = await this.authService.validateToken(token);

      if (decoded && decoded.sub) {
        request.user = { id: decoded.sub };
        return true;
      } else {
        throw new UnauthorizedException('Token inválido, id não encontrado');
      }
    } catch (err) {
      throw new UnauthorizedException('Token inválido. Faça login novamente.');
    }
  }
}
