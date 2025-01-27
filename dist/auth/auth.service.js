"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_not_found_exception_1 = require("../exceptions/user-not-found.exception");
const invalid_password_exception_1 = require("../exceptions/invalid-password.exception");
const data_not_found_exception_1 = require("../exceptions/data-not-found.exception");
const jsonwebtoken_1 = require("jsonwebtoken");
const expired_token_exception_1 = require("../exceptions/expired-token.exception");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get('SECRET'),
            });
            return decoded;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new expired_token_exception_1.ExpiredTokenException();
            }
            else {
                throw new common_1.UnauthorizedException('Token inválido');
            }
        }
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new user_not_found_exception_1.UserNotFoundException();
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const { password, ...result } = user;
            return result;
        }
        else {
            throw new invalid_password_exception_1.InvalidPasswordException();
        }
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        const secret = this.configService.get('SECRET');
        if (!user) {
            throw new invalid_password_exception_1.InvalidPasswordException();
        }
        const userWithId = { ...user, _id: (await this.usersService.findByEmail(email))._id };
        return {
            access_token: this.jwtService.sign({ email: userWithId.email, sub: userWithId._id }, { expiresIn: '1h', secret }),
            refresh_token: this.jwtService.sign({ email: userWithId.email, sub: userWithId._id }, { expiresIn: '7d', secret }),
            user_name: userWithId.name
        };
    }
    async infoLoginId(loginDto) {
        const { email } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const { id } = user;
            return { id };
        }
        else {
            throw new data_not_found_exception_1.DataNotFoundException();
        }
    }
    async infoLogin(loginDto) {
        const { email } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const { name } = user;
            return { name };
        }
        else {
            throw new data_not_found_exception_1.DataNotFoundException();
        }
    }
    async refreshToken(token) {
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
    generateRandomPassword(length = 10) {
        const chars = process.env.GENERATE_PASS;
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map