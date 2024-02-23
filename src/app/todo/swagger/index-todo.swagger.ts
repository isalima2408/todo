import { OmitType, PartialType } from "@nestjs/swagger";
import { Todo } from "../entity/Todo.entity";


// testando partial type e omit type. Esse é o único método que possui isso
export class IndexTodoSwagger extends PartialType(OmitType(Todo, ['createdAt', 'deletedAt', 'updatedAt'])) {}