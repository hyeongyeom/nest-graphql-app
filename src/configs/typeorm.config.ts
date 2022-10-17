import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'nest-graphql',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export const OrmConfig = {
  ...typeORMConfig,
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export default OrmConfig;
