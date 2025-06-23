import { Module } from '@nestjs/common';
import { BarberShopService } from './barber-shop.service';
import { BarberShopController } from './barber-shop.controller';
import { BarberShopRepository } from './barber-shop.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShop } from './entities/barber-shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarberShop])],
  controllers: [BarberShopController],
  providers: [BarberShopService, BarberShopRepository],
  exports: [BarberShopRepository]
})
export class BarberShopModule {}
