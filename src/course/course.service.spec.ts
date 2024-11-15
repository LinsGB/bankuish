import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma.service';

const mockFindManyCourse = jest.fn();
const mockFindManySchedule = jest.fn();
class MockPrismaCourse {
  $transaction = jest.fn((calback) => Promise.resolve(calback(this)));
  course = {
    findMany: mockFindManyCourse,
    create: jest.fn(() => Promise.resolve()),
  };
  schedule = {
    create: () => mockFindManySchedule,
    findMany: mockFindManySchedule,
  };
}

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useClass: MockPrismaCourse },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  describe('getStudySchedule', () => {
    it('should call schedule and course repository and ruturn valid result', async () => {
      const userId = '1';

      mockFindManySchedule.mockImplementationOnce(() =>
        Promise.resolve([{ name: 'schedule1', id: 0, userId }]),
      );
      mockFindManyCourse.mockImplementationOnce(() =>
        Promise.resolve([
          {
            id: 0,
            title: 'finance',
            order: 0,
            scheduleId: 0,
          },
          {
            id: 0,
            title: 'salary',
            order: 1,
            scheduleId: 0,
          },
        ]),
      );

      expect(await service.getStudySchedule(userId)).toEqual([
        {
          schedule1: ['finance', 'salary'],
        },
      ]);

      expect(mockFindManySchedule).toHaveBeenCalledTimes(1);
      expect(mockFindManyCourse).toHaveBeenCalledTimes(1);
    });
  });
});
