import { registerEnumType } from '@nestjs/graphql';

export enum Color {
  Black = 'Black',
  White = 'White',
  Red = 'Red',
  Blue = 'Blue',
}

registerEnumType(Color, {
  name: 'Color',
  description: '휴대폰 색',
  valuesMap: {
    Black: {
      description: '검정색',
    },
    White: {
      description: '하얀색',
    },
    Red: {
      description: '빨강색',
    },
    Blue: {
      description: '파란색',
    },
  },
});
