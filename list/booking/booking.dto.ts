import { Expose } from "class-transformer";

export class BookingResponseDto {
    @Expose()
    id: number;

    @Expose()
    date: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    deletedAt: Date;
}