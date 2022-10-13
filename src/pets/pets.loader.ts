import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PetsService } from 'src/pets/pets.service';

@Injectable({ scope: Scope.REQUEST })
export class PetsLoader {
  constructor(private readonly petsService: PetsService) {}

  public readonly findByPetId  = new DataLoader(
    async (petsIds: readonly number[]) => {
      const pets = await this.petsService.loadByIds(petsIds);
      const petMap = new Map(pets.map((pet) => [pet.id, pet]));
      return petsIds.map((petId) => petMap.get(petId));
    },
  );
}
