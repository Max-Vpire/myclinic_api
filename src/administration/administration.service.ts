import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdministrationModel } from './administration.model';
import { CreateAdministrationDto } from './dto/create-administration.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class AdministrationService {
    constructor(@InjectModel(AdministrationModel) private administrationModel: typeof AdministrationModel) { }

    async create(dto: CreateAdministrationDto) {
        const hashedPassword: string = await bcrypt.hash(dto.password, 10);
        const administration = await this.administrationModel.create({
            ...dto,
            id: v4(),
            password: hashedPassword
        })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return administration;
    }

    async findAll() {
        const administrations = await this.administrationModel.findAll({ where: { deleted: false } })
            .then(administrations => {
                return administrations;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return administrations;
    }

    async findById(idx: string) {
        const administration = await this.administrationModel.findOne({ where: { id: idx, deleted: false } })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            });

        if (!administration) {
            throw new NotFoundException();
        }

        return administration;
    }

    async findByPhoneNumber(number: string) {
        const administration = await this.administrationModel.findOne({ where: { number: number, deleted: false } })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration) {
            throw new NotFoundException();
        }

        return administration;
    }

    async searchByNameAndSurname(query: string) {
        const administrations = await this.administrationModel.findAll({
            where: {
                [Op.or]: [
                    {
                        name: { [Op.like]: `%${query}%` }
                    },
                    {
                        surname: { [Op.like]: `%${query}%` }
                    }
                ]
            }
        })
            .then(administrations => {
                return administrations;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        return administrations;
    }

    async editPassword(idx: string, pass: string) {
        const hashedPassword = await bcrypt.hash(pass, 10)
        const administration = await this.administrationModel.update({ password: hashedPassword }, { where: { id: idx, deleted: false } })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration[0]) {
            throw new NotFoundException();
        }

        return administration
    }

    async unActive(idx: string) {
        const administration = await this.administrationModel.update({ activated: false }, {
            where: {
                id: idx,
                activated: true,
                deleted: false
            }
        })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.messaage, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration[0]) {
            throw new NotFoundException();
        }

        return administration;
    }

    async active(idx: string) {
        const administration = await this.administrationModel.update({ activated: true }, {
            where: {
                id: idx,
                activated: false,
                deleted: false
            }
        })
            .then(administration => {
                return administration;
            })
            .catch(err => {
                throw new HttpException(err.messaage, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration[0]) {
            throw new NotFoundException();
        }

        return administration;
    }

    async delete(idx: string) {
        const administration = await this.administrationModel.update({ deleted: true }, {
            where: {
                id: idx,
                deleted: false
            }
        }).then(administration => {
            return administration;
        })
            .catch(err => {
                throw new HttpException(err.messaage, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration[0]) {
            throw new NotFoundException();
        }

        return administration;
    }

    async returnBack(idx: string) {
        const administration = await this.administrationModel.update({ deleted: false }, {
            where: {
                id: idx,
                deleted: true
            }
        }).then(administration => {
            return administration;
        })
            .catch(err => {
                throw new HttpException(err.messaage, HttpStatus.INTERNAL_SERVER_ERROR);
            });

        if (!administration[0]) {
            throw new NotFoundException();
        }

        return administration;
    }
}