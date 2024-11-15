import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';

const mockCreateUser = jest.fn();
const mockVerifyIdToken = jest.fn();
jest.mock('firebase-admin', () => ({
  auth: () => ({
    createUser: mockCreateUser,
    verifyIdToken: mockVerifyIdToken,
  }),
}));

const mockPost = jest.fn();
class mockHttpService {
  post = mockPost;
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: HttpService, useClass: mockHttpService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should call registerUser and get a valid result', async () => {
    mockCreateUser.mockImplementationOnce(() => Promise.resolve('userRecord'));

    expect(
      await service.registerUser({
        email: 'linsgb2@gmail.com',
        password: '12345678',
      }),
    ).toEqual('userRecord');

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith({
      displayName: 'user',
      email: 'linsgb2@gmail.com',
      password: '12345678',
    });
  });

  describe('validateRequest', () => {
    it('shuld call validateRequest and get true', async () => {
      mockVerifyIdToken.mockImplementationOnce(() => Promise.resolve('4321'));

      expect(
        await service.validateRequest({
          headers: { authorization: 'Bearer 1234' },
        }),
      ).toBeTruthy();

      expect(mockVerifyIdToken).toHaveBeenCalledTimes(1);
      expect(mockVerifyIdToken).toHaveBeenCalledWith('1234');
    });

    it('shuld call validateRequest and get false', async () => {
      expect(
        await service.validateRequest({
          headers: { authorization: 'Bea 1234' },
        }),
      ).toBeFalsy();

      expect(mockVerifyIdToken).toHaveBeenCalledTimes(1);
      expect(mockVerifyIdToken).toHaveBeenCalledWith('1234');
    });
  });

  describe('getUserId', () => {
    it('should call getUserId and get a user id', async () => {
      mockVerifyIdToken.mockImplementationOnce(async () =>
        Promise.resolve({ uid: '123uid' }),
      );

      expect(
        await service.getUserId({
          headers: { authorization: 'Bearer 1234' },
        }),
      ).toBe('123uid');

      expect(mockVerifyIdToken).toHaveBeenCalledWith('1234');
    });
  });
});
