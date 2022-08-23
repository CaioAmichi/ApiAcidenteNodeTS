import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Usuario } from "./Usuario"

@Entity()
export class Acidente {
    @PrimaryGeneratedColumn()
    Id: number

    @Column({})
    Data: Date

    @Column({
        length: 100,
    })
    VeiculoCliente: string

    @Column({
        length: 100,
        nullable: true,
    })
    VeiculoTerceiro: string
    
    @Column({
        nullable: true, 
        length: 255
    })
    Descricao: string

    @ManyToOne(type => Usuario, Usuario => Usuario.AcidentesCadastrados)
    FkIdUsuarioCliente: Usuario; 

    @ManyToMany(type => Usuario, Usuario => Usuario.AcidentesTerceirizado)
    @JoinTable()
    FkIdUsuarioTerceiros: Usuario[]


}
