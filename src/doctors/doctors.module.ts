import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorsModel } from './doctors.model';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([DoctorsModel])
  ]
})
export class DoctorsModule {}
