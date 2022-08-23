import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Acidente } from "./Acidente"
import { Endereco } from "./Endereco"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    Id: number

    @Column({
        length: 100,
    })
    Nome: string

    @Column({
        length: 100,
    })
    Cpf: string

    @Column({
        nullable: true, 
        length: 100
    })
    CNH: string
    
    @Column({
        nullable: true, 
        length: 100
    })
    Telefone: string

    @Column({
        nullable: true, 
        length: 100
    })
    Email: string

    @OneToOne(type => Endereco) @JoinColumn() 
    Endereco: Endereco;

    @Column({})
    Cliente: boolean

    @Column({})
    Ativo: boolean

    @OneToMany(type => Acidente, Acidente => Acidente.FkIdUsuarioCliente) 
    AcidentesCadastrados: Acidente[];

    @OneToMany(type => Acidente, Acidente => Acidente.FkIdUsuarioCliente) 
    AcidentesTerceirizado: Acidente[];
}
