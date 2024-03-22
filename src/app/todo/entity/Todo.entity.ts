import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//test
@Entity('tarefa')
export class Todo {
    @PrimaryGeneratedColumn('uuid', { name: 'trfcod' })
    @ApiProperty()
    id: string

    @Column({ type: 'varchar', length: 255,  name: 'trfdescricao'})
    @ApiProperty()
    atividade: string

    @Column({ type: 'boolean', width: 1, name: 'trfconcluida' })
    @ApiProperty()
    concluida: number

    @CreateDateColumn({ name: 'trfdtcriacao' })
    @ApiProperty()
    createdAt: string

    @UpdateDateColumn({ name: 'trfdtatualizacao' })
    @ApiProperty()
    updatedAt: string

    @DeleteDateColumn({ name: 'trfdtdelecao' })
    @ApiProperty()
    deletedAt: string
}