import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { CreateAdministrationDto } from './dto/create-administration.dto';

@Controller('administration')
export class AdministrationController {
    constructor(private administrationService: AdministrationService) { }

    @Get('get')
    async getAll() {
        return this.administrationService.findAll();
    }

    @Post('new')
    async create(@Body() dto: CreateAdministrationDto) {
        return this.administrationService.create(dto);
    }

    @Get('get/id/:id')
    async getOne(@Param('id') idx: string) {
        return this.administrationService.findById(idx);
    }

    @Get('get/num')
    async getByPhoneNumber(@Query('number') num: string) {
        return this.administrationService.findByPhoneNumber(num);
    }

    @Get('searche')
    async searchByNameAndSurname(@Query('value') value: string) {
        return this.administrationService.searchByNameAndSurname(value);
    }

    @Put('edit/password/:id')
    editPassword(
        @Param('id') idx: string,
        @Body('password') pass: string
    ) {
        return this.administrationService.editPassword(idx, pass);
    }

    @Put('unactive/:id')
    unActive(@Param('id') idx: string) {
        return this.administrationService.unActive(idx);
    }

    @Put('active/:id')
    active(@Param('id') idx: string) {
        return this.administrationService.active(idx);
    }

    @Put('delete/:id')
    delete(@Param('id') idx: string) {
        return this.administrationService.delete(idx);
    }

    @Put('return/back/:id')
    returnBack(@Param('id') idx: string) {
        return this.returnBack(idx);
    }
}