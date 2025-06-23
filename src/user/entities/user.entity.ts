import { role } from "list/user/roles.enum";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string

    @Column()
    phoneNumber: string

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: role,
        default: 'user',
      })
     role: role;


     @OneToMany(() => Booking, (booking) => booking.user)
     clients: Booking[];

     @CreateDateColumn()
     createdAt: Date;
 
     @UpdateDateColumn()
     updatedAt: Date;
 
     @DeleteDateColumn()
     deletedAt: Date;
}