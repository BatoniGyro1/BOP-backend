import { InjectRepository } from "@nestjs/typeorm";
import { Barber } from "./entities/barber.entity";
import { Repository } from "typeorm";
import { CreateBarberDto } from "./dto/create-barber.dto";
import { BarberShop } from "src/barber-shop/entities/barber-shop.entity";
import { UpdateBarberDto } from "./dto/update-barber.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BarberRepository {
    constructor(
        @InjectRepository(Barber) private readonly barberRepository: Repository<Barber>
    ) {

    }

    async create(createBarberDto: CreateBarberDto, barberShop: BarberShop): Promise<Barber> {
        const created = this.barberRepository.create(createBarberDto);
        created.barber_shop = barberShop;
        return await this.barberRepository.save(created);
    }

    async findOne(id: number): Promise<Barber> {
        return await this.barberRepository.findOne({where: {id}, relations: ['barber_shop']});
    }

    async findAll(): Promise<Barber[]> {
        return await this.barberRepository.find({relations: ['barber_shop']});
    }

    async update(id: number, createBarberDto: UpdateBarberDto, barberShop: BarberShop): Promise<Barber> {
        const created = this.barberRepository.create(createBarberDto);
        created.id = id;
        created.barber_shop = barberShop;
        return await this.barberRepository.save(created);
    }

    async restore(id: number) {
        return await this.barberRepository.restore(id);
    }

    async remove(id: number) {
        return await this.barberRepository.softDelete(id);
    }
}