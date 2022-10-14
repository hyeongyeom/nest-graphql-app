import { forwardRef, Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesResolver } from './phones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { OwnersModule } from 'src/owners/owners.module';
import { PhonesLoader } from './phones.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Phone]), 
  forwardRef(()=> OwnersModule)],
  providers: [PhonesResolver, PhonesService,PhonesLoader],
  exports:[PhonesService]
})
export class PhonesModule {}
