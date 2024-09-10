import { Body, Controller, Post } from '@nestjs/common';
import { AdministrationLoginDto } from './dto/aministration-login.dto';
import { AdministrationAuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private administrationAuthService: AdministrationAuthService) { }
    @Post('login')
    async Login(@Body() dto: AdministrationLoginDto) {
        return this.administrationAuthService.login(dto);
    }
}
