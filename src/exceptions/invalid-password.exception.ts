import { UnauthorizedException } from '@nestjs/common';

export class InvalidPasswordException extends UnauthorizedException {
  constructor(message: string = 'Senha inválida!') {
    super(message);
  }
}
