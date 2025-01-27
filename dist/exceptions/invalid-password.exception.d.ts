import { UnauthorizedException } from '@nestjs/common';
export declare class InvalidPasswordException extends UnauthorizedException {
    constructor(message?: string);
}
