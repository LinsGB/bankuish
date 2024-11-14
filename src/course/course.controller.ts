import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Get('/')
  getCourse() {
    return this.service.getCourses();
  }
}
