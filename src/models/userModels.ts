import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Usuarios {
    @PrimaryColumn()
    idusuario: string

    @Column()
    nome: string

    @Column()
    idade: number

    @Column()
    cpf:string

    @Column()
    funcao: string

    @Column()
    email: string

    @Column()
    senha: string

    @Column()
    idagente: string
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
    
}