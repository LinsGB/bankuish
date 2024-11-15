import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CourseModule } from '../../course/course.module';
import { UserService } from '../../user/user.service';
import * as firebaseAdmin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Course (e2e)', () => {
  let app: INestApplication;
  let token: string = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CourseModule],
    }).compile();

    const service = moduleFixture.get<UserService>(UserService);
    token = (
      await service.loginUser({
        email: 'linsgb2@gmail.com',
        password: '12345678',
      })
    ).idToken;
    app = moduleFixture.createNestApplication();
    await app.init();

    const firebaseKeyFilePath = join(
      __dirname,
      '../bankuish-d02fc-firebase-adminsdk-k55j9-ac873b5177.json',
    );

    const firebaseServiceAccount /*: ServiceAccount*/ = JSON.parse(
      readFileSync(firebaseKeyFilePath).toString(),
    );
    if (firebaseAdmin.apps.length === 0) {
      console.log('Initialize Firebase Application.');
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
      });
    }
  });

  it('login', async () => {
    await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'linsgb2@gmail.com',
        password: '12345678',
      })
      .expect(201);
  });

  it('should create schedule', async () => {
    await request(app.getHttpServer())
      .post('/course/schedule')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 'ZFXUg0GKX9ZnVgxNb2Sw8CcUklv1',
        name: 'test3',
        courses: [
          {
            desiredCourse: 'PortfolioConstruction',
            requiredCourse: 'PortfolioTheories',
          },
          {
            desiredCourse: 'InvestmentManagement',
            requiredCourse: 'Investment',
          },
          {
            desiredCourse: 'Investment',
            requiredCourse: 'Finance',
          },
          {
            desiredCourse: 'PortfolioTheories',
            requiredCourse: 'Investment',
          },
          {
            desiredCourse: 'InvestmentStyle',
            requiredCourse: 'InvestmentManagement',
          },
        ],
      })
      .expect(201);
  });

  it('should show schedules', async () => {
    await request(app.getHttpServer())
      .get('/course')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
