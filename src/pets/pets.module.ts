import { forwardRef, Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { OwnersModule } from 'src/owners/owners.module';
import { PetsLoader } from './pets.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), 
  forwardRef(()=> OwnersModule)],
providers: [PetsService, PetsResolver,PetsLoader],
  exports: [PetsService],
})
export class PetsModule {}
