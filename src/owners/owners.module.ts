import { forwardRef, Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { PetsModule } from 'src/pets/pets.module';
import { OwnersLoader } from './owners.loader';
import { PhonesModule } from 'src/phones/phones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]),
  forwardRef(()=> PetsModule),
  forwardRef(()=> PhonesModule)
],
  providers: [OwnersResolver, OwnersService,OwnersLoader],
  exports: [OwnersService],
})
export class OwnersModule {}
