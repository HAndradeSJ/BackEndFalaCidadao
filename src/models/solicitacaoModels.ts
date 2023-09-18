import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { Categoria } from "./categoriaModels"
import { Usuarios } from "./userModels"


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

    @OneToOne(()=>Usuarios,(usuarios) => usuarios.idusuario)
    @Column()
    fk_idusuario: string
    @JoinColumn({ name: 'fk_idusuario' })

    @OneToOne(()=>Usuarios,(usuarios) => usuarios.idusuario)
    @Column()
    fk_idagente: string
    @JoinColumn({ name: 'fk_idagente' })

    @ManyToOne(() => Categoria, (categoria) => categoria.idcategoria)
    @Column()
    fk_idcategoria: string
    @JoinColumn({ name:'fk_idcategoria'})
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}