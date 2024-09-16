import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorsController {
    constructor(
        private doctorsService: DoctorsService
    ) {}

    @Post('new')
    @UseInterceptors(FileInterceptor('image'))
    create(
        @Body() dto: CreateDoctorDto,
        @UploadedFile() image: BufferedFile
    ) {
        return this.doctorsService.create(dto, image)
    }

    @Get('all')
    getAll() {
        return this.doctorsService.findAll();
    }

    @Get('get/id/:id')
    findById(@Param('id') idx: string) {
        return this.doctorsService.findById(idx);
    }

}
