import { Query, Resolver } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService) {}
    
    @Query(returns => [Pet])
    pets():Promise<Pet[]> {
        return this.petService.findAll();
    }

    createPet(createPetInput:CreatePetInput):Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }
}
