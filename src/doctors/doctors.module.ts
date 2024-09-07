import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [AuthModule]
})
export class DoctorsModule {}
