import { rating } from "list/barber-shop/barber-shop.enum";
import { Barber } from "src/barber/entities/barber.entity";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BarberShop {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @Column()
    address: string;

    @Column({type: 'enum', enum: rating, nullable: true})
    rating: rating;

    @Column()
    description: string;

    @OneToMany(() => Barber, (barber) => barber.barber_shop) 
    barbers: Barber[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
