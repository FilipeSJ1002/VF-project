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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Users_schema_1 = require("./schema/Users.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const email_service_1 = require("../email/email.service");
let UsersService = class UsersService {
    constructor(userModel, emailService) {
        this.userModel = userModel;
        this.emailService = emailService;
    }
    async create(usersDTO) {
        const email = await this.findByEmail(usersDTO.email, true);
        if (email) {
            throw new common_1.ConflictException("Email already exists");
        }
        const secretPassword = await bcrypt.hash(usersDTO.password, 10);
        const createUsers = new this.userModel({ ...usersDTO, email: usersDTO.email.toLowerCase(), password: secretPassword });
        const newUser = createUsers.save();
        await this.emailService.sendWelcomeEmail(usersDTO.email, usersDTO.name);
        return newUser;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        const user = this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('Usuario não encontrado!');
        }
        return user;
    }
    async findByEmail(email, register = false) {
        const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
        if (!user && !register) {
            throw new common_1.NotFoundException('Usuario não encontrado!');
        }
        return user;
    }
    async update(id, usersDTO) {
        const user = this.userModel.findByIdAndUpdate(id, usersDTO).exec();
        if (!user) {
            throw new common_1.NotFoundException('Usuario não encontrado!');
        }
        return user;
    }
    async updateUser(id, usersDTO) {
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            throw new common_1.NotFoundException('Usuário não encontrado!');
        }
        if (usersDTO.password) {
            usersDTO.password = await bcrypt.hash(usersDTO.password, 10);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: usersDTO }, { new: true }).exec();
        return updatedUser;
    }
    async delete(id) {
        const user = this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('Usuario não encontrado!');
        }
    }
    async updatePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map