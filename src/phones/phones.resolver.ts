import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PhonesService } from './phones.service';
import { Phone } from './entities/phone.entity';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { PhonesLoader } from './phones.loader';

@Resolver(() => Phone)
export class PhonesResolver {
  constructor(
    private readonly phonesService: PhonesService,
    private readonly phonesLoader:PhonesLoader
    ) {}

  @Query(() => [Phone], { name: 'phones' })
  phones() {
    return this.phonesService.findAll();
  }

  @Query(() => Phone)
  getPhone(@Args('id', { type: () => Int }) id: number) {
    return this.phonesService.findOne(id);
  }

  // @ResolveField((returns) => Owner)
  // owner(@Parent() phone: Phone): Promise<Owner> {
  //   return this.phonesService.getOwner(phone.ownerId);
  // }

  @ResolveField((returns) => Owner)
  owner(@Parent() phone: Phone) {
    return this.phonesLoader.findByOwnerId.load(
      phone.ownerId
    )
  }

  @Mutation(() => Phone)
  createPhone(@Args('createPhoneInput') createPhoneInput: CreatePhoneInput) {
    return this.phonesService.create(createPhoneInput);
  }

  @Mutation(() => Phone)
  updatePhone(@Args('updatePhoneInput') updatePhoneInput: UpdatePhoneInput) {
    return this.phonesService.update(updatePhoneInput.id, updatePhoneInput);
  }

  @Mutation(() => Phone)
  removePhone(@Args('id', { type: () => Int }) id: number) {
    return this.phonesService.remove(id);
  }
}
