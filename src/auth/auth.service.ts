import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from "bcrypt"
import { TokenInterface } from 'list/auth/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {

  }

  async login(createAuthDto: CreateAuthDto) {
      const user = await this.userRepository.findByEmail(createAuthDto.email);

      try {
        if(user && await bcrypt.compare(createAuthDto.password, user.password)) {
          const plainobj: TokenInterface = {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
          }
          const token = await this.generateToken(plainobj);
          return {
            succesful: true,
            access_token: token,
          };
        } else {
          throw new Error('Password or Email is incorrect')
        }
      } catch(err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }

    async generateToken(tokenInterface: TokenInterface) {
      
      const token = await this.jwtService.signAsync(tokenInterface, {
        secret: process.env.JWTSECRET
    });
    return token;
  }
}
