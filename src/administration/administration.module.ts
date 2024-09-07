import { Module } from '@nestjs/common';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdministrationModel } from './administration.model';

@Module({
  controllers: [AdministrationController],
  providers: [AdministrationService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([AdministrationModel])
  ]
})
export class AdministrationModule {}
