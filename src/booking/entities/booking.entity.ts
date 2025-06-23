import { UserResponseDto } from "list/user/user.dto";
import { Barber } from "src/barber/entities/barber.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Barber, (barber) => barber.clients)
    barber: Barber;

    @ManyToOne(() => User, (user) => user.clients)
    user: UserResponseDto;

    @Column({unique: true})
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
