import { InjectRepository } from "@nestjs/typeorm";
import { BarberShop } from "./entities/barber-shop.entity";
import { Like, Repository } from "typeorm";
import { CreateBarberShopDto } from "./dto/create-barber-shop.dto";
import { UpdateBarberShopDto } from "./dto/update-barber-shop.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BarberShopRepository {
    constructor(
        @InjectRepository(BarberShop) private readonly barberShopRepository: Repository<BarberShop>
    ) {

    }

    async create(createBarberShopDto: CreateBarberShopDto): Promise<BarberShop> {
        const created = this.barberShopRepository.create(createBarberShopDto);
        return await this.barberShopRepository.save(created);
    }

    async findOne(id: number): Promise<BarberShop>  {
        return await this.barberShopRepository.findOne({where: {id}, relations: ['barbers']});
    }

    async findAll(): Promise<BarberShop[]>  {
        return await this.barberShopRepository.find({relations: ['barbers']});
    }
    
    async update(id: number, updateBarberShopDto: UpdateBarberShopDto) {
        return await this.barberShopRepository.update(id, updateBarberShopDto);
    }

    async remove(id: number) {
        return await this.barberShopRepository.softDelete(id);
    }

    async restore(id: number) {
        return await this.barberShopRepository.restore(id);
    }

    async searchShopBarber(name: string) {
        return await this.barberShopRepository.find({
            where: {
                name: Like(`%${name}%`),
            }
        })
    }

}