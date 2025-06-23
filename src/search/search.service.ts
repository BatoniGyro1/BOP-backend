import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { BarberShopRepository } from 'src/barber-shop/barber-shop.repository';
import { BarberRepository } from 'src/barber/barber.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly barberShopRepository: BarberShopRepository,
    private readonly barberRepository: BarberRepository
  ) {

  }
  async findBarberShop(createSearchDto: CreateSearchDto) {
    return await this.barberShopRepository.searchShopBarber(createSearchDto.find);
  }

  async findBarber(createSearchDto: CreateSearchDto) {
    return await this.barberRepository.searchBarber(createSearchDto.find);
  }
}
