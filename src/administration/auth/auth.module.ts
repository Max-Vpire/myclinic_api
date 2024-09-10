import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
