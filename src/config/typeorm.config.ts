import { TypeOrmModuleOptions } from '@nestjs/typeorm';
console.log(__dirname);
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskManagement',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
