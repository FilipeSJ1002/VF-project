import { UnauthorizedException } from '@nestjs/common';
export declare class ExpiredTokenException extends UnauthorizedException {
    constructor(message?: string);
}
