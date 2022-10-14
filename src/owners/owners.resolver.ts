import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/entities/pet.entity';
import { OwnersLoader } from './owners.loader';
import { Phone } from 'src/phones/entities/phone.entity';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly ownerLoader:OwnersLoader
    ) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @ResolveField(() => [Pet])
  pets(@Parent() owner: Owner) { 
    return this.ownerLoader.findPetsByOwnerId.load(
      owner.id
    ) 
  }

  @ResolveField(() => [Phone])
  Phones(@Parent() owner: Owner) { 
    return this.ownerLoader.findPhonesByOwnerId.load(
      owner.id
    ) 
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
