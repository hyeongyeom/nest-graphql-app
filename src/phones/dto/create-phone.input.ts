import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Column } from 'typeorm';
import { Phone } from '../entities/phone.entity';
import { Color } from '../enums/color.enum';

@InputType()
export class CreatePhoneInput extends PickType(
  Phone,
  ['name', 'color', 'ownerId'] as const,
  InputType,
) {}
