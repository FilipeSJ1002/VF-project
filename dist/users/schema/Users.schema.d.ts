import { Document } from "mongoose";
export type UsersDocument = Users & Document;
export declare class Users {
    name: string;
    password: string;
    email: string;
}
export declare const usersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users> & Users & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, import("mongoose").FlatRecord<Users>> & import("mongoose").FlatRecord<Users> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
