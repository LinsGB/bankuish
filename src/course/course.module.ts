import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CourseService, PrismaService],
  controllers: [CourseController],
  imports: [UserModule],
})
export class CourseModule {}
