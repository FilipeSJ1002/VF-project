import { NotFoundException } from '@nestjs/common';
export declare class UserNotFoundException extends NotFoundException {
    constructor(message?: string);
}
