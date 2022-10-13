import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123123',
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
