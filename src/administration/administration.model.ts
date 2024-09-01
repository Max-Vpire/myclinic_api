import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'administration'})
export class AdministrationModel extends Model<AdministrationModel> {
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
    
}