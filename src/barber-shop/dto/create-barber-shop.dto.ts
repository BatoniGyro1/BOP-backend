import { IsEnum, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { rating } from "list/barber-shop/barber-shop.enum";

export class CreateBarberShopDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsPhoneNumber()
    phoneNumber: number;

    @MinLength(80)
    @MaxLength(1000)
    description: string
}
