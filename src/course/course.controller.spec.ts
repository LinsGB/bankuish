import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../guard/auth.guard';
import { CanActivate } from '@nestjs/common';

const mockGetStudySchedule = jest.fn();
const mockCreateStudySchedule = jest.fn();
class MockCourseService {
  getStudySchedule = mockGetStudySchedule;
  createStudySchedule = mockCreateStudySchedule;
}

const mockGetUserId = jest.fn();
class MockUserService {
  getUserId = mockGetUserId;
}

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const mockForcePassGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        { provide: CourseService, useClass: MockCourseService },
        { provide: UserService, useClass: MockUserService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockForcePassGuard)
      .compile();

    controller = module.get<CourseController>(CourseController);
  });

  it('should return valid value when call getCourse', async () => {
    const userId = '1';

    mockGetStudySchedule.mockImplementationOnce(() => []);
    mockGetUserId.mockImplementationOnce(() => Promise.resolve(userId));

    expect(await controller.getCourse('payload')).toEqual([]);

    expect(mockGetStudySchedule).toHaveBeenCalledTimes(1);
    expect(mockGetStudySchedule).toHaveBeenCalledWith(userId);

    expect(mockGetUserId).toHaveBeenCalledTimes(1);
    expect(mockGetUserId).toHaveBeenCalledWith('payload');
  });

  it('should return valid value when call createSchedule', async () => {
    const payload = {
      courses: [],
      name: 'schedule1',
      userId: '0',
    };

    mockCreateStudySchedule.mockImplementationOnce(() => []);

    expect(await controller.createSchedule(payload)).toEqual([]);

    expect(mockCreateStudySchedule).toHaveBeenCalledTimes(1);
    expect(mockCreateStudySchedule).toHaveBeenCalledWith(payload);
  });
});
