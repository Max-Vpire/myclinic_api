import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorsModel } from './doctors.model';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([DoctorsModel]),
    MinioClientModule
  ]
})
export class DoctorsModule {}
