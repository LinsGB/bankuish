import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CourseDto)
  courses: CourseDto[];
}

export class CourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  desiredCourse: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requiredCourse: string;
}
