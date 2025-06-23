import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { BarberModule } from 'src/barber/barber.module';
import { BarberShopModule } from 'src/barber-shop/barber-shop.module';

@Module({
  imports: [BarberModule, BarberShopModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
