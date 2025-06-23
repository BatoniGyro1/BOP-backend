import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'; //I wrote with hand
import { BarberShopModule } from './barber-shop/barber-shop.module';
import { BarberModule } from './barber/barber.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { SearchModule } from './search/search.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bop9',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BarberShopModule,
    BarberModule,
    UserModule,
    BookingModule,
    AuthModule,
    SearchModule,
  ],
})
export class AppModule {}