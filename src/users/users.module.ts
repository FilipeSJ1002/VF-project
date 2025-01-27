import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, usersSchema } from './schema/Users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    EmailModule, 
    MongooseModule.forFeature([{ name: Users.name, schema: usersSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
