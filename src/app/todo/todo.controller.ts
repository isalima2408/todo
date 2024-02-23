import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { FindOneTodoSwagger } from './swagger/findOne-todo.swagger';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { BadRequestSwagger } from './helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './helpers/swagger/not-found.swagger';

// CONFIGURAÇÃO DOS ENDPOINTS
@Controller('api/v1/todos')
// renomeia o default para 'todos', é como se fosse um título para os controles daqui
@ApiTags('todos')
export class TodoController {
    constructor( private readonly todoService: TodoService ) {}

    @Get()
    @ApiOperation({ summary: 'Lista todas as tarefas' })
    @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso', type: IndexTodoSwagger, isArray: true })
    async findAll() {
        return await this.todoService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lista tarefa específica pelo id'})
    @ApiResponse({ status: 200, description: 'Dados de uma tarefa retornado com sucesso', type: FindOneTodoSwagger })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos', type: BadRequestSwagger })
    @ApiResponse({ status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger })
    // O parseuuidpipe() confere se o id passado esta em formato válido (ex: xxx-xxx-xxx), ele é uma TIPAGEM *
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneOrFail(id)
    }

    @Post()
    @ApiOperation({ summary: 'Cria nova tarefa'})
    @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso', type: CreateTodoSwagger })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos', type: BadRequestSwagger })
    async create(@Body() body: CreateTodoDTO) {
        return await this.todoService.create(body)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza tarefa pelo id'})
    @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso', type: UpdateTodoSwagger })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos', type: BadRequestSwagger })
    @ApiResponse({ status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDTO) {
        return await this.todoService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Exclui tarefa pelo id (remove da listagem por adição de timestamp)'})
    @ApiResponse({ status: 204, description: 'Tarefa excluída com sucesso' })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos', type: BadRequestSwagger })
    @ApiResponse({ status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger })
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        // nao precisa retornar nada, apenas executar
        await this.todoService.remove(id)
    }
}
