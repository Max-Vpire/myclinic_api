import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly surname: string

    @IsNotEmpty()
    @IsString()
    readonly middlename: string

    @IsNotEmpty()
    @IsString()
    readonly number: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    readonly password: string

    @IsNotEmpty()
    @IsString()
    readonly gender: string

    @IsNotEmpty()
    readonly birthday: Date
}