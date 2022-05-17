import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
  .setTitle("myFundAct API")
  .setVersion('1.0.0')
  .addBearerAuth(
    { 
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'http', // I`ve attempted type: 'apiKey' too
      in: 'Header'
    },
    'jwt', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
    .build();

  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)
  //await app.listen(3000);
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
