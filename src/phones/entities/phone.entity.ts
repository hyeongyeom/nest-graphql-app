import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
