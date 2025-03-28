import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

// Load environment variables from .env file
dotenv.config();

/**
 * Configure Swagger documentation for the application
 * @param app The NestJS application instance
 */
function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Ankit ZPQV APIs')
    .setDescription('API documentation for Ankit ZPQV APIs')
    .setVersion('1.0')
    .addTag('app', 'Application endpoints')
    .addTag('openai', 'OpenAI integration endpoints')
    .addBearerAuth() // Add bearer auth support for future endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Additional Swagger UI options
  const options = {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  };

  SwaggerModule.setup('api', app, document, options);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Setup Swagger documentation
  setupSwagger(app);

  // Use a different port to avoid conflicts
  const port = parseInt(process.env.PORT || '8080', 10);

  console.log(`Application is running on: http://localhost:${port}/api`);
  await app.listen(port);
}

bootstrap();
