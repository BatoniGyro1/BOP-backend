import { IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { BarberShop } from "src/barber-shop/entities/barber-shop.entity";
import { ManyToMany, ManyToOne } from "typeorm";

export class CreateBarberDto {
    @IsString()
    name: string;

    @IsPhoneNumber()
    phone_number: string

    @IsNumber()
    barberShopId: number;
}
