import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tarefa')
export class Todo {
    @PrimaryGeneratedColumn('uuid', { name: 'trfcod' })
    id: string

    @Column({ type: 'varchar', length: 255,  name: 'trfdescricao'})
    atividade: string

    @Column({ type: 'boolean', width: 1, name: 'trfconcluida' })
    concluida: number

    @CreateDateColumn({ name: 'trfdtcriacao' })
    createdAt: string

    @UpdateDateColumn({ name: 'trfdtatualizacao' })
    updatedAt: string

    @DeleteDateColumn({ name: 'trfdtdelecao' })
    deletedAt: string
}