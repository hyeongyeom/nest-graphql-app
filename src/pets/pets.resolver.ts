import {
  Args,
  Mutation,
  Query,
  Resolver,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { PetsLoader } from './pets.loader';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(
    private petService: PetsService,
    private petsloader:PetsLoader
    ) {}

  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petService.findOne(id);
  }

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  // @ResolveField((returns) => Owner)
  // owner(@Parent() pet: Pet): Promise<Owner> {
  //   return this.petService.getOwner(pet.ownerId);
  // }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet) {
    return this.petsloader.findByOwnerId.load(
      pet.ownerId
    )
  }

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petService.createPet(createPetInput);
  }
}
