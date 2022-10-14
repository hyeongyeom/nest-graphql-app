import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { OwnersService } from 'src/owners/owners.service';

@Injectable({ scope: Scope.REQUEST })
export class PhonesLoader {
  constructor(private readonly ownerService:OwnersService) {}

  public readonly findByOwnerId  = new DataLoader(
    async (ownersIds: readonly number[]) => {
      const owners = await this.ownerService.loadByIds(ownersIds);
      const ownerMap = new Map(owners.map((owner) => [owner.id, owner]));
      return ownersIds.map((ownerId) => ownerMap.get(ownerId));
    },
  );
}
