import { UsersService } from './users.service';
import { userDto } from './dto/userDto';
import { loginDto } from './dto/loginDto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(body: userDto): Promise<userDto>;
    findAll(): Promise<userDto[]>;
    findOne(id: string): Promise<loginDto | undefined>;
    update(id: string, body: userDto): Promise<userDto | undefined>;
    updateUser(id: string, usersDTO: Partial<userDto>): Promise<userDto>;
    delete(id: string): Promise<void>;
}
