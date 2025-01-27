import { NotFoundException } from '@nestjs/common';
export declare class DataNotFoundException extends NotFoundException {
    constructor(message?: string);
}
