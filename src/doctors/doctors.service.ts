import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorsModel } from './doctors.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(DoctorsModel) private doctorsModel: typeof DoctorsModel,
        private minioService: MinioClientService
    ) {}

    async create(dto: CreateDoctorDto, image: BufferedFile) {
        const path = await this.minioService.upload(image)
        .then(res => {
            return res;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
        const hashedPasword = await bcrypt.hash(dto.password, 10)
        const doctor = await this.doctorsModel.create({
            ...dto,
            id: v4(),
            password: hashedPasword,
            avatar: path.url
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

    async findByNumber(num: string) {
        const doctor = await this.doctorsModel.findOne({where: {number: num, deleted: false}})
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

    async searchByNameAndSurname(query: string) {
        const doctors = await this.doctorsModel.findAll({
            where: {
                [Op.or]: [
                    {
                        name: { [Op.like]: `%${query}%` }
                    },
                    {
                        surname: { [Op.like]: `%${query}%` }
                    }
                ],
                deleted: false
            }
        })
            .then(doctors => {
                return doctors;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return doctors;
    }

    async editPassword(pass: string, idx: string) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const doctor = await this.doctorsModel.update({
            password: hashedPassword
        },{ where: {
            id: idx,
            deleted: false
        }}
        ).then(doctor => {
            return doctor;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!doctor[0]) {
            throw new NotFoundException();
        }

        return doctor;
    }

    async unActiveDoctor(idx: string) {
        const doctor = await this.doctorsModel.update({
            activated: false
        }, {
            where: {
                id: idx,
                deleted: false
            }
        }).then(doctor => {
            return doctor;
        })
        .catch(err => {
            throw new HttpException(err.MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!doctor[0]) {
            throw new NotFoundException();
        }

        return doctor;
    }

    async activeDoctor(idx: string) {
        const doctor = await this.doctorsModel.update({
            activated: true
        }, {
            where: {
                id: idx,
                deleted: false
            }
        }).then(doctor => {
            return doctor;
        })
        .catch(err => {
            throw new HttpException(err.MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!doctor[0]) {
            throw new NotFoundException();
        }

        return doctor;
    }

    async deleteDoctor(idx: string) {
        const doctor = await this.doctorsModel.update({
            deleted: true
        },{
            where: {
                id: idx,
                deleted: false
            }
        }).then(doctor => {
            return doctor;
        }).catch(err => {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!doctor[0]) {
            throw new NotFoundException();
        }

        return doctor;
    }

    async reStoreUser(idx: string) {
        const doctor = await this.doctorsModel.update({
            deleted: false
        }, {
            where: {
                id: idx,
                deleted: true
            }
        });

        if(!doctor[0]) {
            throw new NotFoundException();
        }

        return doctor;
    }
}