import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn,JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { Usuarios } from "./userModels"

@Entity()
export class Secretaria {
    @PrimaryColumn()
    idsecretaria: string

    @Column()
    nome: string

    @Column()
    responsavel: string

    @Column()
    telefone: number

    @Column()
    descricao: string

    @OneToOne(()=>Usuarios,{eager:true})
    @JoinColumn({ name: 'fk_idusuario' })
    fk_idusuario: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}