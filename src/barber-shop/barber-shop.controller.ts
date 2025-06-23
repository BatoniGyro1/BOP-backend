import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BarberShopService } from './barber-shop.service';
import { CreateBarberShopDto } from './dto/create-barber-shop.dto';
import { UpdateBarberShopDto } from './dto/update-barber-shop.dto';
import { BarberShopResponseDto } from 'list/barber-shop/barber-shop.dto';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { role } from 'list/user/roles.enum';

@Controller('barbershop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post('/add')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  create(@Body() createBarberShopDto: CreateBarberShopDto): Promise<BarberShopResponseDto> {
    return this.barberShopService.create(createBarberShopDto);
  }

  @Get()
  findAll(): Promise<BarberShopResponseDto[]> {
    return this.barberShopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BarberShopResponseDto>{
    return this.barberShopService.findOne(+id);
  }

  @Patch('/restore/:id')
  restore(@Param('id') id: number) {
    return this.barberShopService.restore(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  update(@Param('id') id: string, @Body() updateBarberShopDto: UpdateBarberShopDto) {
    return this.barberShopService.update(+id, updateBarberShopDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  remove(@Param('id') id: string) {
    return this.barberShopService.remove(+id);
  }
}
