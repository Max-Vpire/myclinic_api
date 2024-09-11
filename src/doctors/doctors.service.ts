import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorsModel } from './doctors.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(DoctorsModel) private doctorsModel: typeof DoctorsModel
    ) {}

    async create(dto: CreateDoctorDto) {
        const hashedPasword = await bcrypt.hash(dto.password, 10)
        const doctor = await this.doctorsModel.create({
            ...dto,
            id: v4(),
            password: hashedPasword
        })
        .then(doctor => {
            return doctor;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        return doctor;
    }

    async findAll() {
        const doctors = await this.doctorsModel.findAll({where: {deleted: false}})
            .then(doctors => {
                return doctors;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

            return doctors;
    }

    async findById(idx: string) {
        const doctor = await this.doctorsModel.findOne({where: {id: idx, deleted: false}})
            .then(doctor => {
                return doctor;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

            if(!doctor) {
                throw new NotFoundException();
            }

            return doctor;
    }
}
