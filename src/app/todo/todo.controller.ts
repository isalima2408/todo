import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

// CONFIGURAÇÃO DOS ENDPOINTS
@Controller('api/v1/todos')
export class TodoController {
    constructor( private readonly todoService: TodoService ) {}

    @Get()
    async findAll() {
        return await this.todoService.findAll()
    }

    @Get(':id')
    // O parseuuidpipe() confere se o id passado esta em formato válido (ex: xxx-xxx-xxx), ele é uma TIPAGEM *
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneOrFail(id)
    }

    @Post()
    async create(@Body() body: CreateTodoDTO) {
        return await this.todoService.create(body)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDTO) {
        return await this.todoService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        // nao precisa retornar nada, apenas executar
        await this.todoService.remove(id)
    }
}
