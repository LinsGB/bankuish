import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateScheduleDto } from './course.dto';
import { CourseService } from './course.service';
import { UserService } from 'src/user/user.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly service: CourseService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getCourse(@Request() req) {
    const userId = await this.userService.getUserId(req)
    console.log('userId =>', userId)
    return this.service.getStudySchedule(userId);
  }

  @Post('/schedule')
  @UseGuards(AuthGuard)
  async createSchedule(@Body() payload: CreateScheduleDto) {
    return this.service.createStudySchedule(payload);
  }
}
