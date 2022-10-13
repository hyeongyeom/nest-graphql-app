import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../enums/color.enum';

@Entity()
@ObjectType()
export class Phone {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(() => Color, { nullable: true, description: '휴대폰 색' })
  @Column({
    type: 'enum',
    enum: Color,
    default: Color.Black,
    nullable: true,
  })
  @IsEnum(Color)
  color?: Color;

  @Column()
  @Field()
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.phone)
  @Field((type) => Owner)
  owner: Owner;
}
