import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientModel } from './patient.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PatientModel]),
    AuthModule,
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
