import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateScheduleDto } from './course.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../guard/auth.guard';
import { CourseService } from './course.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('course')
@ApiBearerAuth('access-token')
export class CourseController {
  constructor(
    private readonly service: CourseService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getCourse(@Request() req) {
    const userId = await this.userService.getUserId(req);
    return this.service.getStudySchedule(userId);
  }

  @Post('/schedule')
  @UseGuards(AuthGuard)
  async createSchedule(@Body() payload: CreateScheduleDto) {
    return this.service.createStudySchedule(payload);
  }
}
