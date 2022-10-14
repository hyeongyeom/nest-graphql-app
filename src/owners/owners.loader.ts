import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import groupBy from 'lodash/groupBy'
import { PetsService } from 'src/pets/pets.service';
import { PhonesService } from 'src/phones/phones.service';

@Injectable({ scope: Scope.REQUEST })
export class OwnersLoader {
  constructor(
    private readonly petsService: PetsService,
    private readonly phonesService:PhonesService
    ) {}

  public readonly findPetsByOwnerId  = new DataLoader(
    async (ownersIds: readonly number[]) => {
      const pets = await this.petsService.loadByIds(ownersIds);
      const petsGroup=groupBy(pets,'ownerId')
    return ownersIds.map((ownerId) => petsGroup[ownerId] ?? []);
    },
  );

  public readonly findPhonesByOwnerId  = new DataLoader(
    async (ownersIds: readonly number[]) => {
      const phones = await this.phonesService.loadByIds(ownersIds);
      const phonesGroup=groupBy(phones,'ownerId')
    return ownersIds.map((ownerId) => phonesGroup[ownerId] ?? []);
    },
  );
}
