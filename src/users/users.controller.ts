import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './dto/userDto';
import { loginDto } from './dto/loginDto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post()
    async create(@Body()body: userDto): Promise<userDto>{
        return this.usersService.create(body)
    }

    @Get()
    async findAll(): Promise<userDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<loginDto | undefined> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: userDto): Promise<userDto | undefined> {
        return this.usersService.update(id, body);
    }
    
    @Patch(':id/update')
    async updateUser(@Param('id') id: string, @Body() usersDTO: Partial<userDto>) {
        return this.usersService.updateUser(id, usersDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.usersService.delete(id);
    }
}
