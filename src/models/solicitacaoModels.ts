import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, Generated, ManyToMany,  } from "typeorm"
import { Categoria } from "./categoriaModels"
import { Usuarios } from "./userModels"


@Entity()
export class Solicitacao {
    @PrimaryColumn()
    idsolicitacao: string

    @Column({nullable:true})
    chamado:string

    @Column()
    status: string

    @Column()
    data_abertura: string

    @Column({nullable:true})
    data_encerramento: string

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
    
    @ManyToOne(()=>Categoria,(categoria)=> categoria.idcategoria,{nullable: false, eager: true})
    @JoinColumn({ name: 'fk_idcategoria', referencedColumnName:'idcategoria' })
    fk_idcategoria: string

    @ManyToOne(()=>Usuarios,{nullable:true, eager: true})
    @JoinColumn({ name: 'fk_idagente'})
    fk_idagente:string

    @ManyToOne(()=>Usuarios,{eager:true})
    user: Usuarios


    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}