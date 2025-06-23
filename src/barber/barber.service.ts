import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { BarberRepository } from './barber.repository';
import { BarberShopRepository } from 'src/barber-shop/barber-shop.repository';
import { BarberShop } from 'src/barber-shop/entities/barber-shop.entity';

@Injectable()
export class BarberService {
  constructor(
    private readonly barberRepostiory: BarberRepository,
    private readonly barberShopRepository: BarberShopRepository,
  ) {

  }

  async create(createBarberDto: CreateBarberDto) {
    try {
      const barberShop: BarberShop = await this.barberShopRepository.findOne(createBarberDto.barberShopId);
      if(!barberShop) {
        throw new Error('barberShop Id is incorrect')
      }
      return await this.barberRepostiory.create(createBarberDto, barberShop);
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }

  }

  async findAll() {
    return await this.barberRepostiory.findAll();
  }

  async findOne(id: number) {
    const user = await this.barberRepostiory.findOne(id);
    return user;
  }

  async update(id: number, updateBarberDto: UpdateBarberDto) {
    const barberShop: BarberShop = await this.barberShopRepository.findOne(updateBarberDto.barberShopId)
    return await this.barberRepostiory.update(id, updateBarberDto, barberShop);
  }

  async restore(id: number) {
    return await this.barberRepostiory.restore(id);
  }

  async remove(id: number) {
    return await this.barberRepostiory.remove(id);
  }
}
