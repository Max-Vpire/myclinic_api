import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientModule } from './patient/patient.module';
import { PatientModel } from './patient/patient.model';
import { AdministrationModule } from './administration/administration.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AdministrationModel } from './administration/administration.model';
import { DoctorsModel } from './doctors/doctors.model';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadModels: true,
      models: [
        PatientModel,
        AdministrationModel,
        DoctorsModel
      ]
    }),
    PatientModule,
    AdministrationModule,
    DoctorsModule,
    MinioClientModule
  ]
})
export class AppModule {}
