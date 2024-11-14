import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [CourseModule, UserModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
