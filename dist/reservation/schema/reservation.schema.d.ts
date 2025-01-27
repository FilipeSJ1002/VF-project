import { Document, Types } from 'mongoose';
export type ReservationDocument = Reservation & Document;
export declare class Reservation {
    productId: Types.ObjectId;
    userId: Types.ObjectId;
    status: string;
    reservedAt: Date;
    updatedAt: Date;
}
export declare const ReservationSchema: import("mongoose").Schema<Reservation, import("mongoose").Model<Reservation, any, any, any, Document<unknown, any, Reservation> & Reservation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reservation, Document<unknown, {}, import("mongoose").FlatRecord<Reservation>> & import("mongoose").FlatRecord<Reservation> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
