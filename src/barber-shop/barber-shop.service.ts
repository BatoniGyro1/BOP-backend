import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarberShopDto } from './dto/create-barber-shop.dto';
import { UpdateBarberShopDto } from './dto/update-barber-shop.dto';
import { BarberShopRepository } from './barber-shop.repository';
import { BarberShopResponseDto } from 'list/barber-shop/barber-shop.dto';

@Injectable()
export class BarberShopService {
  constructor(
    private readonly barberShopRepository: BarberShopRepository
  ) {

  }

  async create(createBarberShopDto: CreateBarberShopDto): Promise<BarberShopResponseDto> {
    try {
      return await this.barberShopRepository.create(createBarberShopDto);
    } catch(err) {
      if(err.code === 1062) {
        throw new HttpException('Name duplicated error', HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }

  }

  async findAll(): Promise<BarberShopResponseDto[]> {
    return await this.barberShopRepository.findAll();
  }

  async findOne(id: number): Promise<BarberShopResponseDto> {
    try {
      const barberShop = await this.barberShopRepository.findOne(id);
      if(!barberShop) {
        throw new Error('Barber Shop id not founded')
      }
      return barberShop;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateBarberShopDto: UpdateBarberShopDto) {
    return await this.barberShopRepository.update(id, updateBarberShopDto)
  }

  async remove(id: number) {
    return await this.barberShopRepository.remove(id);
  }

  async restore(id: number) {
    return await this.barberShopRepository.restore(id);
  }
}
