import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getCourse() {
    return this.service.getCourses();
  }
}
