import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User Authentication')
    .setDescription(
      'The API details for the User Authentication Demo application using Firebase in the NestJS backend.',
    )
    .setVersion('1.0')
    .addTag('Authentication')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const firebaseKeyFilePath =
    './bankuish-d02fc-firebase-adminsdk-k55j9-ac873b5177.json';
  const firebaseServiceAccount /*: ServiceAccount*/ = JSON.parse(
    fs.readFileSync(firebaseKeyFilePath).toString(),
  );
  if (firebaseAdmin.apps.length === 0) {
    console.log('Initialize Firebase Application.');
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    });
  }

  await app.listen(3000);
}

bootstrap();
