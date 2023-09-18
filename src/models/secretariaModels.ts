import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Usuarios } from "./userModels"

@Entity()
export class Secretaria {
    @PrimaryColumn()
    idssecretaria: string

    @Column()
    nome: string

    @Column()
    responsavel: string

    @Column()
    telefone: number

    @Column()
    descricao: string

    @OneToOne(()=> Usuarios, usuarios => usuarios.idusuario)
    @JoinColumn({ name: 'fk_idusuario' })
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}