import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT || '8080', 10); // Azure Linux expects 8080
  await app.listen(port);
}
bootstrap();
