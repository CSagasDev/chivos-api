import { existsSync } from 'node:fs';
import { DataSource, type DataSourceOptions } from 'typeorm';

// En la laptop, las variables salen de .env. En Docker no hay .env: las pone
// compose o Dokploy, y las que ya existen no se pisan.
if (existsSync('.env')) process.loadEnvFile('.env');

export const opciones: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // Nunca cambiar las tablas solas: todo cambio va por migraciones (D-026).
  synchronize: false,
  migrations: [`${import.meta.dirname}/migrations/*.js`],
};

// La usa la terminal de TypeORM para generar y correr migraciones.
export default new DataSource({
  ...opciones,
  entities: [`${import.meta.dirname}/../**/*.entity.js`],
});
