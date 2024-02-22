import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTodoDTO {
    @IsString()
    @IsNotEmpty()
    atividade: string

    // tipo numérico
    @IsNumber()
    // not null
    @IsNotEmpty() 
    // está entre
    @IsIn([0, 1]) 
    concluida: number
}