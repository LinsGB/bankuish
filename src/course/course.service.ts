import { Injectable } from '@nestjs/common';
import { TopologicalSort } from './utils/toplogicalSort';
import { CreateScheduleDto } from './course.dto';
import { PrismaService } from '../prisma.service';
import { Schedule } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getStudySchedule(userId: string) {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        userId,
      },
    });

    const scheduleCourses = [];

    for (const schedule of schedules) {
      const courses = await this.prisma.course.findMany({
        where: {
          scheduleId: schedule.id,
        },
        orderBy: {
          order: 'asc',
        },
      });

      scheduleCourses.push({ [schedule.name]: courses });
    }
    return scheduleCourses;
  }

  async createStudySchedule(payload: CreateScheduleDto): Promise<Schedule> {
    const schedule = await this.prisma.schedule.create({
      data: {
        userId: payload.userId,
        name: payload.name,
      },
    });

    const topologicalSort = new TopologicalSort(payload.courses);
    topologicalSort.createEdgeRelation();
    topologicalSort.startTopologicalSort();
    for (let x = 0; x < topologicalSort.orderedNodes.length; x++) {
      await this.prisma.course.create({
        data: {
          order: x,
          title: topologicalSort.orderedNodes[x],
          scheduleId: schedule.id,
        },
      });
    }
    return schedule;
  }
}
