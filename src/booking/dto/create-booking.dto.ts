import { IsDateString, IsInt, IsNumber, isInt } from "class-validator";

export class CreateBookingDto {

    @IsNumber()
    @IsInt()
    barberId: number;

    @IsDateString()
    date: Date;
    
}
