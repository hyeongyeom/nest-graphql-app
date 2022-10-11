import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from './../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository:Repository<Pet>,private ownerService:OwnersService) {}

    createPet(createPetInput:CreatePetInput): Promise<Pet> {
        const newPet=this.petsRepository.create(createPetInput);

        return this.petsRepository.save(newPet);
    }

    async findAll():Promise<Pet[]> {
        return this.petsRepository.find();
    }

    findOne(id:number):Promise<Pet> {
        return this.petsRepository.findOneBy({id});
    }


    getOwner(ownerId:number):Promise<Owner> {
        return this.ownerService.findOne(ownerId);
    }

}
