"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async sendWelcomeEmail(email, name) {
        await this.transporter.sendMail({
            from: 'teste@email.com',
            to: email,
            subject: 'Bem-vindo',
            text: `Conta criada com sucesso, ${name}`
        });
    }
    async sendResetPasswordEmail(email, name) {
        const resetLink = `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}`;
        await this.transporter.sendMail({
            from: 'teste@email.com',
            to: email,
            subject: 'Recuperação de Senha',
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                <h2>Olá, ${name}</h2>
                <p>Recebemos uma solicitação para redefinir sua senha. Se foi você, confirme a solicitação clicando no botão abaixo.</p>
                <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirmar redefinição de senha</a>
                <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
                <p>Atenciosamente,<br/>Suporte VF</p>
            </div>
        `
        });
    }
    async sendNewPasswordEmail(email, name, newPassword) {
        await this.transporter.sendMail({
            from: 'teste@email.com',
            to: email,
            subject: 'Sua Nova Senha',
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                <h2>Olá, ${name}</h2>
                <p>Sua senha foi redefinida com sucesso. Sua nova senha é:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff;">${newPassword}</p>
                <p>Recomendamos que você altere esta senha na próxima vez que acessar sua conta.</p>
                <p>Atenciosamente,<br/>Suporte VF</p>
            </div>
        `
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map