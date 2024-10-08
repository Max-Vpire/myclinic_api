import { IsNotEmpty, IsString, Length } from "class-validator";

export class AdministrationLoginDto {
    @IsNotEmpty()
    readonly number: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    readonly password: string
}