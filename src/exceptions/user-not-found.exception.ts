import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message: string = 'Usuário não encontrado!') {
    super(message);
  }
}
