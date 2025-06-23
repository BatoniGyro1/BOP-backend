import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { MyAuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWTSECRET,
    global: true,
    signOptions: {
      expiresIn: '7d'
    }
  }),
  forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: MyAuthGuard,
  }],
  exports: [AuthService],
})
export class AuthModule {}
