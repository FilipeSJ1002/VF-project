import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginDto } from 'src/users/dto/loginDto';
import { userDto } from 'src/users/dto/userDto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateToken(token: string): Promise<any>;
    validateUser(email: string, password: string): Promise<Omit<userDto, 'password'> | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
        user_name: string;
    } | {
        error: string;
    }>;
    infoLoginId(loginDto: loginDto): Promise<{
        id: string;
    } | {
        error: string;
    }>;
    infoLogin(loginDto: loginDto): Promise<{
        name: string;
    } | {
        error: string;
    }>;
    refreshToken(token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    generateRandomPassword(length?: number): string;
}
