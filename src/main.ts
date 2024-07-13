import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar ValidationPipe globalmente para validar y transformar datos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Eliminar propiedades no definidas en DTOs
    forbidNonWhitelisted: true,  // Lanzar error si hay propiedades no definidas
    transform: true,  // Transformar automáticamente las solicitudes a DTOs
  }));

  // Configurar CORS para permitir acceso desde el frontend en el puerto 4000
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4000',  // Origen permitido (frontend React)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Encabezados permitidos
    credentials: true,  // Habilitar credenciales (cookies, headers de autorización)
  };

  // Aplicar CORS antes de cualquier otro middleware
  app.enableCors(corsOptions);

  // Iniciar la aplicación en el puerto 3001
  await app.listen(3001);
}

bootstrap();