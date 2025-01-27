import { NotFoundException } from '@nestjs/common';

export class DataNotFoundException extends NotFoundException {
  constructor(message: string = 'Dados não encontrados!') {
    super(message);
  }
}
