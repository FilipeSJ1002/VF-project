import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schema/reservation.schema';
import { ReservationDto } from './dto/reservationDto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>
  ) {}

  private toReservationDto(reservation: ReservationDocument): ReservationDto {
    return {
      ...reservation.toObject(),
      productId: reservation.productId.toString(),
      userId: reservation.userId.toString(),
    };
  }

  async create(reservationDto: ReservationDto): Promise<ReservationDto> {
    const createReservation = new this.reservationModel(reservationDto);
    const savedReservation = await createReservation.save();
    return this.toReservationDto(savedReservation);
  }

  async findAll(): Promise<ReservationDto[]> {
    const reservations = await this.reservationModel.find().exec();
    return reservations.map(reservation => this.toReservationDto(reservation));
  }

  async findUserReservations(userId: string): Promise<ReservationDto[]> {
    const reservations = await this.reservationModel.find({ userId }).exec();
    return reservations.map(reservation => this.toReservationDto(reservation));
  }

  async updateStatus(id: string, status: string): Promise<ReservationDto | null> {
    const reservation = await this.reservationModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada!');
    }
    return this.toReservationDto(reservation);
  }
}
