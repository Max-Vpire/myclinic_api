import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorsModel } from './doctors.model';
import { Model } from 'sequelize';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(DoctorsModel) private doctorsModel: typeof DoctorsModel
    ) {}

    async create(dto) {

    }
}
