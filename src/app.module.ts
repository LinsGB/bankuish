import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [CourseModule, UserModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
