import { UnauthorizedException } from '@nestjs/common';

export class ExpiredTokenException extends UnauthorizedException {
    constructor(message?: string) {
        super(message || 'O token expirou. Por favor, faça login novamente.');
    }
}
