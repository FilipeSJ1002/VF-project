import { Model } from 'mongoose';
import { ReservationDocument } from './schema/reservation.schema';
import { ReservationDto } from './dto/reservationDto';
export declare class ReservationService {
    private reservationModel;
    constructor(reservationModel: Model<ReservationDocument>);
    private toReservationDto;
    create(reservationDto: ReservationDto): Promise<ReservationDto>;
    findAll(): Promise<ReservationDto[]>;
    findUserReservations(userId: string): Promise<ReservationDto[]>;
    updateStatus(id: string, status: string): Promise<ReservationDto | null>;
}
