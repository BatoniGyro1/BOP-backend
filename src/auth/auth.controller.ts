import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './auth.decorator';


@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }


}
