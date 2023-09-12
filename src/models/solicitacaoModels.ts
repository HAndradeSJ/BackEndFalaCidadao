import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Categoria } from "./categoriaModels"


@Entity()
export class Solicitacao {
    @PrimaryColumn()
    idsolicitacao: string

    @Column()
    status: string

    @Column()
    imagemUrl: string

    @Column()
    descricao:string

    @Column()
    logradouro: string

    @Column()
    numero: number

    @Column()
    bairro: string
    
    @Column()
    pontoderef: string

    @Column({nullable:true})
    justifictiva: string


    @Column({nullable:true})
    confirmacao: string

    @Column({nullable:true})
    comentario: string

    @Column({nullable:true})
    idusuario: string

    @Column({nullable:true})
    idagente: string

    @OneToOne(() => Categoria, (categoria) => categoria.idcategoria)
    @JoinColumn({ name: 'fk_categoria' })
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}