import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientModel } from './patient.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PatientModel]),
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
