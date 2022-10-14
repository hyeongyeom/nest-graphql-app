import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { In, Repository } from 'typeorm';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    private ownerService: OwnersService,
  ) {}

  create(createPhoneInput: CreatePhoneInput): Promise<Phone> {
    const newPhone = this.phoneRepository.create(createPhoneInput);
    return this.phoneRepository.save(newPhone);
  }

  findAll(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }

  findOne(id: number): Promise<Phone> {
    return this.phoneRepository.findOne(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }

  update(id: number, updatePhoneInput: UpdatePhoneInput): Promise<Phone> {
    return this.phoneRepository.save({ id, updatePhoneInput });
  }

  remove(id: number) {
    return this.phoneRepository.delete({ id });
  }

  async loadByIds(ids: readonly number[]) {
    return await this.phoneRepository.find({
      where: {
        ownerId: In([...ids]),
      },
    });
  }
}
