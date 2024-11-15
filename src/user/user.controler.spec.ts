import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';
import { CanActivate } from '@nestjs/common';

const mockLoginUser = jest.fn();
const mockRegisterUser = jest.fn();

class MockUserService {
  loginUser = mockLoginUser;
  registerUser = mockRegisterUser
}

describe('CourseController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const mockForcePassGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useClass: MockUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockForcePassGuard)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return valid value when call login', async () => {
    const payload = {
      email: 'linsgb2@gmail.com',
      password: '12345678',
    };
    const response = { idToken: 'idTocken' };

    mockLoginUser.mockImplementationOnce(() => Promise.resolve(response));

    expect(await controller.login(payload)).toEqual(response);
  });

  it('should return valid value when call registerUser', async () => {
    const payload = {
      email: 'linsgb2@gmail.com',
      password: '12345678',
    };
    const response = { idToken: 'idTocken' };

    mockRegisterUser.mockImplementationOnce(() => Promise.resolve(response));

    expect(await controller.registerUser(payload)).toEqual(response);
  });
});
