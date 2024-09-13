import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'doctors'})
export class DoctorsModel extends Model<DoctorsModel> {
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
        type: DataType.TEXT,
        unique: true,
        allowNull: false,
    }) avatar: string

    @Column({
        type: DataType.TEXT,
        unique: true,
        allowNull: false
    }) number: string

    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false
    }) password: string

    @Column({
        type: DataType.ENUM('Male', 'Female'),
        unique: false,
        allowNull: false
    }) gender: string

    @Column({
        type: DataType.DATE,
        unique: false,
        allowNull: false
    }) birthday: Date

    @Column({
        type: DataType.BOOLEAN,
        unique: false,
        defaultValue: true
    }) activated: boolean

    @Column({
        type: DataType.BOOLEAN,
        unique: false,
        defaultValue: false
    }) deleted: boolean
}