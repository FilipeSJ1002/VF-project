import { UsersDocument } from './schema/Users.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/userDto';
import { EmailService } from '../email/email.service';
export declare class UsersService implements IUserService {
    private userModel;
    private readonly emailService;
    constructor(userModel: Model<UsersDocument>, emailService: EmailService);
    create(usersDTO: userDto): Promise<userDto>;
    findAll(): Promise<userDto[]>;
    findOne(id: string): Promise<userDto | undefined>;
    findByEmail(email: string, register?: boolean): Promise<UsersDocument | undefined>;
    update(id: string, usersDTO: userDto): Promise<userDto | undefined>;
    updateUser(id: string, usersDTO: Partial<userDto>): Promise<userDto | undefined>;
    delete(id: string): Promise<void>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
}
export interface IUserService {
    create(usersDTO: userDto): Promise<userDto>;
    findAll(): Promise<userDto[]>;
    findOne(id: string): Promise<userDto | undefined>;
    findByEmail(email: string, register: boolean): Promise<UsersDocument | undefined>;
    update(id: string, usersDTO: userDto): Promise<userDto | undefined>;
    updateUser(id: string, usersDTO: Partial<userDto>): Promise<userDto | undefined>;
    delete(id: string): Promise<void>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
}
