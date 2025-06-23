import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { role } from 'list/user/roles.enum';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(role.admin)
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.barberService.create(createBarberDto);
  }

  @Get()
  findAll() {
    return this.barberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.barberService.update(+id, updateBarberDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  remove(@Param('id') id: string) {
    return this.barberService.remove(+id);
  }
}
