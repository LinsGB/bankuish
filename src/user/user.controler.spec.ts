import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should fetch superhero details', () => {
    return request(app.getHttpServer())
      .get('/superheroes/batman')
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toEqual('Batman');
        expect(body.alias).toEqual('The Dark Knight');
      });
  });
});
