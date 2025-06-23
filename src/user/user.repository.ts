import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from "list/user/user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    async create(createUserDto: CreateUserDto) {
        const created = this.userRepository.create(createUserDto);
        const salt = await bcrypt.genSalt()
        created.password = await bcrypt.hash(createUserDto.password, salt)
        return await this.userRepository.save(created)
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users: User[] = await this.userRepository.find({relations: ['clients', 'clients.barber']})
        const arr = []
        for(let i in users) {
            const { password, ...others} = users[i]
            arr.push(others);
            continue;
        }
        return arr;
    }

    async findOne(id: number): Promise<UserResponseDto> {
        const user: User = await this.userRepository.findOne({where: {id}, relations: ['clients', 'clients.barber']});
        const { password, ...others} = user;
        return others;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.softDelete(id)
    }


    async findByEmail(email:string) {
        return await this.userRepository.findOne({where:{email:email}})
    }


}