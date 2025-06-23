import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { User } from "src/user/entities/user.entity";
import { Barber } from "src/barber/entities/barber.entity";
import { UpdateBarberDto } from "src/barber/dto/update-barber.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { UserResponseDto } from "list/user/user.dto";

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>
    ) {

    }

    async create(createBookingDto: CreateBookingDto, user: UserResponseDto, barber: Barber): Promise<Booking> {
        const created = this.bookingRepository.create(createBookingDto);
        created.user = user;
        created.barber = barber;
        return await this.bookingRepository.save(created);
    }

    async findOne(id: number): Promise<Booking> {
        return await this.bookingRepository.findOne({where: {id}})
    }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepository.find({});
    }


    async update(id: number, updateBarberDto: UpdateBookingDto, user: UserResponseDto, barber: Barber): Promise<Booking> {
        const created = this.bookingRepository.create(updateBarberDto);
        created.id = id;
        created.user = user;
        created.barber = barber;
        return await this.bookingRepository.save(created);
    }

    async remove(id: number) {
        return await this.bookingRepository.softDelete(id)
    }
}