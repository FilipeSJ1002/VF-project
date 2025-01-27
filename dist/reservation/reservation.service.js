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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reservation_schema_1 = require("./schema/reservation.schema");
let ReservationService = class ReservationService {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }
    toReservationDto(reservation) {
        return {
            ...reservation.toObject(),
            productId: reservation.productId.toString(),
            userId: reservation.userId.toString(),
        };
    }
    async create(reservationDto) {
        const createReservation = new this.reservationModel(reservationDto);
        const savedReservation = await createReservation.save();
        return this.toReservationDto(savedReservation);
    }
    async findAll() {
        const reservations = await this.reservationModel.find().exec();
        return reservations.map(reservation => this.toReservationDto(reservation));
    }
    async findUserReservations(userId) {
        const reservations = await this.reservationModel.find({ userId }).exec();
        return reservations.map(reservation => this.toReservationDto(reservation));
    }
    async updateStatus(id, status) {
        const reservation = await this.reservationModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        if (!reservation) {
            throw new common_1.NotFoundException('Reserva não encontrada!');
        }
        return this.toReservationDto(reservation);
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reservation_schema_1.Reservation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map