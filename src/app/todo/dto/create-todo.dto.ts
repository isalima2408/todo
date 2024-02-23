import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTodoDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    atividade: string

    // tipo numérico
    @IsNumber()
    // not null
    @IsNotEmpty() 
    // está entre
    @IsIn([0, 1])
    // para se tornar modelo do swagger
    @ApiProperty()
    concluida: number
}