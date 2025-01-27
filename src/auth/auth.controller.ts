import { BadRequestException, Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/users/dto/loginDto';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly emailService: EmailService
    ) { }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        return this.authService.login(body.email, body.password)
    }

    @Post('info-login')
    async infoLogin(@Body() loginDto: loginDto) {
        return this.authService.infoLogin(loginDto);
    }

    @Post('info-login-id')
    async infoLoginId(@Body() loginDto: loginDto) {
        return this.authService.infoLoginId(loginDto);
    }

    @Post('refresh')
    async refreshToken(@Body() body: { refreshToken: string }) {
        return this.authService.refreshToken(body.refreshToken)
    }

    @Post('reset-password')
    async requestResetPassword(@Body() body: { email: string }) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            throw new BadRequestException('E-mail não cadastrado');
        }
        await this.emailService.sendResetPasswordEmail(body.email, user.name);
        return { message: 'Verifique seu e-mail para confirmar a redefinição de senha.' };
    }

    @Post('reset-password/confirm')
    async confirmResetPassword(@Query('email') email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new BadRequestException('E-mail não cadastrado');
        }
        const newPassword = this.authService.generateRandomPassword();
        await this.usersService.updatePassword(user._id as string, newPassword);
        await this.emailService.sendNewPasswordEmail(email, user.name, newPassword);
        return { message: 'Senha redefinida com sucesso. Verifique seu e-mail para a nova senha.' };
    }
}
