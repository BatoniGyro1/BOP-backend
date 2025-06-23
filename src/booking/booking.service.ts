import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingRepository } from './booking.repository';

import { BarberRepository } from 'src/barber/barber.repository';
import { UserRepository } from 'src/user/user.repository';
import { Booking } from './entities/booking.entity';
import { BookingResponseDto } from 'list/booking/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly userRepository: UserRepository,
    private readonly barberRepository: BarberRepository,
  ) {

  }

  async create(createBookingDto: CreateBookingDto, userId: number): Promise<BookingResponseDto> {

    try {
      const user = await this.userRepository.findOne(userId);
      const barber = await this.barberRepository.findOne(createBookingDto.barberId);
      if(!user) {
        throw new Error('User id hasn\'t founded');
      } else if(!barber) {
        throw new Error('Barber id hasn\'t founded');
      }
      return await this.bookingRepository.create(createBookingDto, user, barber);
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<BookingResponseDto[]> {
    return await this.bookingRepository.findAll();
  }

  async findOne(id: number): Promise<BookingResponseDto> {
    try {
      const booking = await this.bookingRepository.findOne(id);
      if(!booking) {
        throw new Error('Booking id hasn\t founded');
      }
      return booking;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto, userId: number): Promise<BookingResponseDto> {
    try {
      const user = await this.userRepository.findOne(userId);
      const barber = await this.barberRepository.findOne(updateBookingDto.barberId);
      if(!user) {
        throw new Error('User id hasn\'t founded');
      } else if(!barber) {
        throw new Error('Barber id hasn\'t founded');
      }
      return await this.bookingRepository.update(id, updateBookingDto, user, barber);
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  
  }

  async remove(id: number) {
    return await this.bookingRepository.remove(id);
  }
}
