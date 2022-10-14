import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOne(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerRepository.save({ id, UpdateOwnerInput });
  }

  remove(id: number) {
    return this.ownerRepository.delete({ id });
  }

  async loadByIds(ids: readonly number[]) {
    return await this.ownerRepository.find({
      where: {
        id: In([...ids]),
      },
    });
  }

}
