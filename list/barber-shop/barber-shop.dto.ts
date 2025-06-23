import { Expose } from "class-transformer";
import { rating } from "./barber-shop.enum";
import { Barber } from "src/barber/entities/barber.entity";

export class BarberShopResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    rating: rating;

    @Expose()
    description: string;

    @Expose()
    barbers: Barber[]

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    deletedAt: Date;

}