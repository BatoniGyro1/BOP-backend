import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { Barber } from './entities/barber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShop } from 'src/barber-shop/entities/barber-shop.entity';
import { BarberShopRepository } from 'src/barber-shop/barber-shop.repository';
import { BarberRepository } from './barber.repository';
import { BarberShopModule } from 'src/barber-shop/barber-shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([Barber]), BarberShopModule],
  controllers: [BarberController],
  providers: [BarberService, BarberRepository],
  exports: [BarberRepository],
})
export class BarberModule {}
