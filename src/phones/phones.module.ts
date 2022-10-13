import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesResolver } from './phones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Phone]), OwnersModule],
  providers: [PhonesResolver, PhonesService],
})
export class PhonesModule {}
