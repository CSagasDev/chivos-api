import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { readFileSync } from 'node:fs';
import { AppModule } from './app.module.js';

// La versión sale del package.json: así sabes qué versión corre en cada entorno.
const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { version: string };

// Swagger se enciende solo al programar en la laptop. Dentro de Docker
// (NODE_ENV=production) solo si el entorno tiene SWAGGER=true.
const swaggerEncendido = process.env.SWAGGER
  ? process.env.SWAGGER === 'true'
  : process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const servidor = app.getHttpAdapter();

  if (swaggerEncendido) {
    const config = new DocumentBuilder()
      .setTitle('Bovigest API')
      .setVersion(version)
      .build();
    SwaggerModule.setup('docs', app, () =>
      SwaggerModule.createDocument(app, config),
    );
    // La página principal lleva directo a la documentación.
    servidor.get('/', (_req: Request, res: Response) => res.redirect('/docs'));
  } else {
    // Sin Swagger, la página principal es una ficha corta.
    servidor.get('/', (_req: Request, res: Response) =>
      res.json({ nombre: 'Bovigest API', version }),
    );
  }

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
