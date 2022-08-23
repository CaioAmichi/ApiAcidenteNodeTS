import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    Id: number

    @Column({
        length: 100,
    })
    Lagradouro: string

    @Column({
        length: 100,
    })
    Bairro: string
    
    @Column({
        length: 100,
    })
    Cidade: string
    
    @Column({
        length: 100,
    })
    Estado: string

    @Column({})
    Numero: Number

    @Column({
        nullable: true,
        length: 100,
    })
    Complemento: string
}
