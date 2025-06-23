import { Exclude, Expose, Type } from "class-transformer";
import { role } from "list/user/roles.enum";
import { Booking } from "src/booking/entities/booking.entity";

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  name: string;

  @Expose()
  role: role;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => Date)
  deletedAt: Date;

  @Expose()
  @Type(() => Booking) 
  clients: Booking[];
}
