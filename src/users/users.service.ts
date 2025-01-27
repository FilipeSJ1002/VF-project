import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/Users.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/userDto';
import * as bcrypt from 'bcryptjs';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService implements IUserService {
    constructor(@InjectModel(Users.name) 
        private userModel: Model<UsersDocument>,
        private readonly emailService: EmailService
    ) {}

    
    async create(usersDTO: userDto): Promise<userDto>{
        const email = await this.findByEmail(usersDTO.email, true);
        if(email){
            throw new ConflictException("Email already exists"); 
        }  
        const secretPassword = await bcrypt.hash(usersDTO.password, 10);
        const createUsers = new this.userModel({...usersDTO, email: usersDTO.email.toLowerCase(), password: secretPassword} );
        const newUser = createUsers.save();
        await this.emailService.sendWelcomeEmail(usersDTO.email, usersDTO.name);
        return newUser;
    }

    async findAll(): Promise<userDto[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<userDto | undefined> {
        const user = this.userModel.findById(id).exec();
        if(!user){
            throw new NotFoundException('Usuario não encontrado!')
        }
        return user;
    }

    async findByEmail(email: string, register:boolean = false): Promise<UsersDocument | undefined> {
        const user = await this.userModel.findOne({email: email.toLowerCase()}).exec();
        if(!user && !register) {
            throw new NotFoundException('Usuario não encontrado!')
        }
        return user;
    }

    async update(id: string, usersDTO: userDto): Promise<userDto | undefined> {
        const user = this.userModel.findByIdAndUpdate(id, usersDTO).exec();
        if(!user){
            throw new NotFoundException('Usuario não encontrado!')
        }
        return user;
    }

    async updateUser(id: string, usersDTO: Partial<userDto>): Promise<userDto | undefined> {
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        if (usersDTO.password) {
            usersDTO.password = await bcrypt.hash(usersDTO.password, 10);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: usersDTO }, { new: true }).exec();
        return updatedUser;
    }
    

    async delete(id: string): Promise<void> {
        const user = this.userModel.findByIdAndDelete(id).exec();
        if(!user){
            throw new NotFoundException('Usuario não encontrado!')
        }
    }

    async updatePassword(userId: string, newPassword: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    }
}

export interface IUserService { 
    create(usersDTO: userDto): Promise<userDto>;
    findAll(): Promise<userDto[]>;
    findOne(id: string): Promise<userDto | undefined>;
    findByEmail(email: string, register:boolean): Promise<UsersDocument | undefined>;
    update(id: string, usersDTO: userDto): Promise<userDto | undefined>;
    updateUser(id: string, usersDTO: Partial<userDto>): Promise<userDto | undefined>;
    delete(id: string): Promise<void>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
}
