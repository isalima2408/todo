import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entity/Todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) {}

    async list() {
        return await this.todoRepository.find()
    }

    async listOne(id: string) {
        try {
            return await this.todoRepository.findOneOrFail({where: {id}})
        } catch (error) {
            throw new NotFoundException("Tarefa não encontrada")
        }
    }

    async create(data) {
        const todo = await this.todoRepository.create(data)
        return await this.todoRepository.save(todo)
    }

    async update(id: string, data) {
        
    }
}
