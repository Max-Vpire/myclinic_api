import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'patients'})
export class PatientModel extends Model<PatientModel> {
    @Column({
        type: DataType.TEXT,
        primaryKey: true,
        unique: true,
        allowNull: false
    }) id: string

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    }) name: string

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    }) surname: string

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    }) middlename: string

    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false
    }) number: number

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    }) password: string

    @Column({
        type: DataType.ENUM('male', 'female'),
        unique: false,
        allowNull: false
    }) gender: string

    @Column({
        type: DataType.DATE,
        unique: false,
        allowNull: false
    }) birthday: Date

    @Column({
        type: DataType.ENUM('A','B','AB','O'),
        unique: false,
        allowNull: false
    }) blood_group: string

    @Column({
        type: DataType.DATE,
        unique: false,
        allowNull: false
    }) last_attend: Date
}