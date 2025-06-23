import { Expose } from "class-transformer";
import { rating } from "list/barber-shop/barber-shop.enum";
import { BarberShop } from "src/barber-shop/entities/barber-shop.entity";

export class BarberResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    phone_number: string;

    @Expose()
    rating: rating;  

    @Expose()
    barber_shop: BarberShop;
}