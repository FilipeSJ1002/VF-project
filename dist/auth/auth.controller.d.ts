import { AuthService } from './auth.service';
import { loginDto } from 'src/users/dto/loginDto';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly emailService;
    constructor(authService: AuthService, usersService: UsersService, emailService: EmailService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user_name: string;
    } | {
        error: string;
    }>;
    infoLogin(loginDto: loginDto): Promise<{
        name: string;
    } | {
        error: string;
    }>;
    infoLoginId(loginDto: loginDto): Promise<{
        id: string;
    } | {
        error: string;
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    requestResetPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    confirmResetPassword(email: string): Promise<{
        message: string;
    }>;
}
