import { rating } from "list/barber-shop/barber-shop.enum";
import { BarberShop } from "src/barber-shop/entities/barber-shop.entity";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Barber {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @Column({type: 'enum', enum: rating, nullable: true})
    rating: rating;

    @ManyToOne(() => BarberShop, (barberShop) => barberShop.barbers)
    barber_shop: BarberShop;
    
    @OneToMany(() => Booking, (booking) => booking.barber)
    clients: Booking[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
