import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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
  @ApiProperty({
    type: [CourseDto],
  })
  @IsNotEmpty()
  @Type(() => CourseDto)
  courses: CourseDto[];
}
