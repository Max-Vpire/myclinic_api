import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AdministrationLoginDto } from './dto/aministration-login.dto';
import { AdministrationService } from '../administration.service';
import * as bcrypt from 'bcrypt';
import { AdministrationModel } from '../administration.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdministrationAuthService {
    
    constructor(
        private administrationService: AdministrationService,
        private jwtService: JwtService
    ) {}

    async login(dto: AdministrationLoginDto) {
        const check = await this.validateUser(dto);
        return this.generateToken(check);
    }

    async validateUser(dto: AdministrationLoginDto) {
        const administration = await this.administrationService.findByPhoneNumber(dto.number);
        if(!administration) {
            throw new NotFoundException();
        }

        const checkPassword = await bcrypt.compare(dto.password, administration.password);
        if(!checkPassword) {
            throw new UnauthorizedException();
        }

        return administration;
    }

    private async generateToken(payload: AdministrationModel) {
        return {
            token: await this.jwtService.signAsync(payload, {secret: process.env.JWTKEY})
        }
    }
}
