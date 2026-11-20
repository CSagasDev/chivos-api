import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { opciones } from './data-source.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...opciones,
      // Cada módulo registra sus tablas con forFeature (D-026).
      autoLoadEntities: true,
      // Al arrancar, aplica las migraciones que falten.
      migrationsRun: true,
    }),
  ],
})
export class DatabaseModule {}
