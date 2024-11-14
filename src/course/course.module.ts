import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [UserModule],
})
export class CourseModule {}
