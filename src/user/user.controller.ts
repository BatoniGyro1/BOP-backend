import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from 'list/user/user.dto';
import { Public } from 'src/auth/auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { role } from 'list/user/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Role(role.admin)
  findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(role.admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
