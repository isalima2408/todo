import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './app/todo/entity/Todo.entity';
import { TodoModule } from './app/todo/todo.module';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  database: 'todo',
  username: 'postgres',
  password: 'root',
  entities: [Todo],
  synchronize: true,
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
          return {
              ...dataSourceOptions,
          }
      },
    }),
    
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
