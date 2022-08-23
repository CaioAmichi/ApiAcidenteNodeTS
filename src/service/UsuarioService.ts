import { Console } from "console";
import { AppDataSource } from "../repository/data-source";
import { Endereco } from "../repository/entity/Endereco";
import { Usuario } from "../repository/entity/Usuario";
import * as ORM from "typeorm"
import { resourceLimits } from "worker_threads";

interface IUsuario {
  Id: Number;
  Nome: string;
  Cpf: string;
  CNH: string;
  Telefone: String;
  Email: string;
  Endereço: Endereco;
  Cliente: Boolean;
  Ativo: Boolean;
}

const _usuarioRepository = AppDataSource.getRepository(Usuario);
const _enderecoRepository = AppDataSource.getRepository(Endereco);

export var ObterTodosUsuarios = async function (): Promise<Usuario[]> {
  const listUsuarios = await _usuarioRepository.find({
    relations: {
      Endereco: true,
    },
  });

  return listUsuarios;
};

export var ObterUsuarioPorId = async function (
  usuarioid: number
): Promise<Usuario> {
  const usuario = await _usuarioRepository.findOne({
    where: {
      Id: usuarioid,
    },
    relations: {
      Endereco: true,
    },
  });

  return usuario;
};

export var ObterPorCpf = async function (
  cpf: string
): Promise<Usuario> {
    const usuario = await _usuarioRepository.findOne({
      where: {
        Cpf: cpf,
      },
      relations: {
        Endereco: true,
      },
    });

    return usuario;  
};

export var CriarUsuario = async function (usuario: Usuario): Promise<Usuario> {

    usuario.Endereco = await _enderecoRepository.manager.save(usuario.Endereco);
    var usuarioCriado = await _usuarioRepository.manager.save(usuario);


  return usuarioCriado;
};

export var EditarUsuario = async function (usuario: Usuario): Promise<Usuario> {
  
    await _enderecoRepository.manager.createQueryBuilder()
    .update(Endereco)
    .set(usuario.Endereco)
    .where("Id = :id", { id: usuario.Endereco.Id })
    .execute()


    await _usuarioRepository.manager.createQueryBuilder()
    .update(Usuario)
    .set({...usuario})
    .where("Id = :id", { id: usuario.Id })
    .execute()


  return usuario;
};
