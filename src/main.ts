import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors(); // Enable CORS for all domains

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
  // await app.listen(3000);
}
bootstrap();
