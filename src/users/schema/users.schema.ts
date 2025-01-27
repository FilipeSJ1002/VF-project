import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
export type UsersDocument = Users & Document

@Schema()
export class Users {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    password: string
    @Prop({required: true})
    email: string
}
export const usersSchema = SchemaFactory.createForClass(Users)