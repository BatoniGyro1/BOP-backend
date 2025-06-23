import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserResponseDto } from 'list/user/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/role.decorator';
import { role } from 'list/user/roles.enum';
import { RoleGuard } from 'src/auth/role.guard';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {

    try {
      const user = await this.userRepository.create(createUserDto);
      if(!user) {
        throw new Error();
      }
      const plainObj = await this.authService.login({
        email: user.email,
        password: user.password,
      });
      if(!plainObj) {
        throw new Error();
      }
      return plainObj;
    } catch(err) {
      if(err.message === 1062) {
        throw new HttpException('Email is duplicated', HttpStatus.BAD_REQUEST)  
      }
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    } 
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne(id);
      if(!user) {
        throw new Error('User Id hasn\'t founded');
      }
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.remove(id);
  }
}
