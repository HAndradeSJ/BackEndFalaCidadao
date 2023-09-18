import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Secretaria } from "./secretariaModels";

@Entity()
export class Categoria {
    @PrimaryColumn()
    idcategoria: string

    @Column()
    categoria: string

    @OneToOne(()=> Secretaria,(Secretaria) => Secretaria.idssecretaria)
    @JoinColumn({ name: 'fk_secretaria' })

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public log_criacao: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public log_update: Date;
    
}