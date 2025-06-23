import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { Booking } from './entities/booking.entity';
import { BarberModule } from 'src/barber/barber.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from 'src/barber/entities/barber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), BarberModule, UserModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
