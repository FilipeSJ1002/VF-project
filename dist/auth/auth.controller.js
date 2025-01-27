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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const loginDto_1 = require("../users/dto/loginDto");
const email_service_1 = require("../email/email.service");
const users_service_1 = require("../users/users.service");
let AuthController = class AuthController {
    constructor(authService, usersService, emailService) {
        this.authService = authService;
        this.usersService = usersService;
        this.emailService = emailService;
    }
    async login(body) {
        return this.authService.login(body.email, body.password);
    }
    async infoLogin(loginDto) {
        return this.authService.infoLogin(loginDto);
    }
    async infoLoginId(loginDto) {
        return this.authService.infoLoginId(loginDto);
    }
    async refreshToken(body) {
        return this.authService.refreshToken(body.refreshToken);
    }
    async requestResetPassword(body) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            throw new common_1.BadRequestException('E-mail não cadastrado');
        }
        await this.emailService.sendResetPasswordEmail(body.email, user.name);
        return { message: 'Verifique seu e-mail para confirmar a redefinição de senha.' };
    }
    async confirmResetPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('E-mail não cadastrado');
        }
        const newPassword = this.authService.generateRandomPassword();
        await this.usersService.updatePassword(user._id, newPassword);
        await this.emailService.sendNewPasswordEmail(email, user.name, newPassword);
        return { message: 'Senha redefinida com sucesso. Verifique seu e-mail para a nova senha.' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('info-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.loginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "infoLogin", null);
__decorate([
    (0, common_1.Post)('info-login-id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.loginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "infoLoginId", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestResetPassword", null);
__decorate([
    (0, common_1.Post)('reset-password/confirm'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmResetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map