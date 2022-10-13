import { CreatePhoneInput } from './create-phone.input';
import {
  InputType,
  Field,
  Int,
  PartialType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { Phone } from '../entities/phone.entity';

@InputType()
export class UpdatePhoneInput extends IntersectionType(
  PickType(Phone, ['id'] as const),
  PartialType(CreatePhoneInput),
  InputType,
) {}
