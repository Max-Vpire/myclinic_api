import { forwardRef, Module } from '@nestjs/common';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import { AdministrationAuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdministrationModel } from './administration.model';

@Module({
  controllers: [AdministrationController],
  providers: [AdministrationService],
  imports: [
    forwardRef(() => AdministrationAuthModule),
    SequelizeModule.forFeature([AdministrationModel])
  ],
  exports: [
    AdministrationService
  ]
})
export class AdministrationModule {}
