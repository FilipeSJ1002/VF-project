import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginDto } from 'src/users/dto/loginDto';
import { userDto } from 'src/users/dto/userDto';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { InvalidPasswordException } from 'src/exceptions/invalid-password.exception';
import { DataNotFoundException } from 'src/exceptions/data-not-found.exception';
import { TokenExpiredError } from 'jsonwebtoken';
import { ExpiredTokenException } from 'src/exceptions/expired-token.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get<string>('SECRET'),
            });
            return decoded;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new ExpiredTokenException();
            } else {
                throw new UnauthorizedException('Token inválido');
            }
        }
    }

    async validateUser(email: string, password: string): Promise<Omit<userDto, 'password'> | null> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UserNotFoundException();
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const { password, ...result } = user;
            return result as Omit<userDto, 'password'>;
        } else {
            throw new InvalidPasswordException();
        }
    }

    async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string; user_name: string } | { error: string }> {
        const user = await this.validateUser(email, password);
        const secret = this.configService.get('SECRET');
        if (!user) {
            throw new InvalidPasswordException();
        }
        const userWithId = { ...user, _id: (await this.usersService.findByEmail(email))._id };
        return {
          access_token: this.jwtService.sign({ email: userWithId.email, sub: userWithId._id }, { expiresIn: '1h', secret }),
          refresh_token: this.jwtService.sign({ email: userWithId.email, sub: userWithId._id }, { expiresIn: '7d', secret }),
          user_name: userWithId.name
        };
    }
    
    async infoLoginId(loginDto: loginDto): Promise<{ id: string } | { error: string }> {
        const { email } = loginDto;
        const user = await this.usersService.findByEmail(email);
    
        if (user) {
            const { id } = user;
            return { id };
        } else {
            throw new DataNotFoundException();
        }
    }    

    async infoLogin(loginDto: loginDto): Promise<{ name: string } | { error: string }> {
        const { email } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const { name } = user;
            return { name };
        } else {
            throw new DataNotFoundException();
        }
    }

    async refreshToken(token: string): Promise<{ access_token: string; refresh_token: string }> {
        const secret = this.configService.get('SECRET');
        const decodedToken = this.jwtService.verify(token, {
          secret,
          ignoreExpiration: true,
        });
        const { exp, iat, ...payload } = decodedToken;
        return {
          access_token: this.jwtService.sign(payload, { expiresIn: '1h', secret }), 
          refresh_token: this.jwtService.sign(payload, { expiresIn: '7d', secret })
        };
      }
      
      

    generateRandomPassword(length = 10): string {
        const chars = process.env.GENERATE_PASS!;
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
}
