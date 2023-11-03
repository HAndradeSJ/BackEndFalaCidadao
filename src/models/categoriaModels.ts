import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,  ManyToOne, ManyToMany } from "typeorm"
import { Secretaria } from "./secretariaModels";

@Entity()
export class Categoria {
    @PrimaryColumn()
    idcategoria: string

    @Column()
    categoria: string

    @ManyToOne(()=> Secretaria,(secretaria)=> secretaria.idsecretaria,{eager: true})
    @JoinColumn({ name: 'fk_idsecretaria', referencedColumnName:'idsecretaria' })
    fk_idsecretaria: string


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}