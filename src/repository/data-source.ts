import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario"
import dotenv from "dotenv"
import { Endereco } from "./entity/Endereco"
import { Acidente } from "./entity/Acidente"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port:  parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Usuario,Endereco,Acidente],
    migrations: [],
    subscribers: [],
})

