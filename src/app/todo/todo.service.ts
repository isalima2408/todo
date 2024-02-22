import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entity/Todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) {}

    async findAll() {
        return await this.todoRepository.find()
    }
    
    // esse método é o único que recebe tratamento de erros inicialmente, isso porque
    // se já tá disparando um erro aqui eu não preciso disparar mais um erro lá. Ai economizo
    // linhas de código
    async findOneOrFail(id: string) {
        try {
            return await this.todoRepository.findOneOrFail({where: {id}})
        } catch (error) {
            throw new NotFoundException("Tarefa inexistente")
        }
    }

    // Para lançar novo dado preciso 'CRIAR' e depois 'SALVAR',
    // O método 'SALVAR' que realmente dá o 'POST'. O 'SALVAR' é como
    // se fosse uma preparação.
    async create(data: CreateTodoDTO) {
        const todo = await this.todoRepository.create(data)
        return await this.todoRepository.save(todo)
    }

    // 
    async update(id: string, data: UpdateTodoDTO) {
        //reutilizando o método de busca desse mesmo arquivo
        const todo = await this.findOneOrFail(id)

        // merge - une várias entidades em uma só
        this.todoRepository.merge(todo, data)
        return await this.todoRepository.save(todo)
    }

    async remove(id: string) {
        await this.findOneOrFail(id)

        // soft delete adiciona um timestamp na coluna deletedAt (criada com decorator @DeleteDateCOlumn)
        // Assim quando executar o método find, ele não mostrará a coluna deletada, pois saberá isso
        // através do timestamp (é como ele identifica)
        await this.todoRepository.softDelete(id)
    }
}
