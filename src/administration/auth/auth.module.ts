import { forwardRef, Module } from '@nestjs/common';
import { AdministrationAuthController } from './auth.controller';
import { AdministrationAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdministrationModule } from '../administration.module';

@Module({
  imports: [
    forwardRef(() => AdministrationModule),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      global: true,
      signOptions: {
        expiresIn: '1d'
      }
    }),
  ],
  controllers: [AdministrationAuthController],
  providers: [AdministrationAuthService]
})
export class AdministrationAuthModule {}
