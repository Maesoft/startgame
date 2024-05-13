import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // Lista de orígenes permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Habilitar credenciales (cookies, encabezados de autorización)
  };
  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();