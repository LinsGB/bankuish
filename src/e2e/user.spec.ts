import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as firebaseAdmin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as request from 'supertest';
import { CourseModule } from '../course/course.module';

describe('Course (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CourseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const firebaseKeyFilePath = join(
      __dirname,
      '../../firebase-file.json',
    );

    const firebaseServiceAccount /*: ServiceAccount*/ = JSON.parse(
      readFileSync(firebaseKeyFilePath).toString(),
    );
    if (firebaseAdmin.apps.length === 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
      });
    }
  });

  it('should register and then login', async () => {
    await request(app.getHttpServer())
      .post('/user/register')
      .send({
        email: 'linsgb2@gmail2.com',
        password: '12345678',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'linsgb2@gmail2.com',
        password: '12345678',
      })
      .expect(201);
  });
});
