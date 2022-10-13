import DataLoader from 'dataloader';
import { Pet } from 'src/pets/entities/pet.entity';
import { PetsService } from 'src/pets/pets.service';

export class PetsLoaders {
  constructor(private readonly petsService: PetsService) {}

  public readonly batchPets = new DataLoader(
    async (petsIds: readonly number[]) => {
      const pets = await this.petsService.loadByIds(petsIds);
      const petMap = new Map(pets.map((pet) => [pet.id, pet]));
      return petsIds.map((petId) => petMap.get(petId));
    },
  );
}
