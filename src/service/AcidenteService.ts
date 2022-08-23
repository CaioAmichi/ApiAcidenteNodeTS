import { AppDataSource } from "../repository/data-source";
import { Endereco } from "../repository/entity/Endereco";
import { Acidente } from "../repository/entity/Acidente";
import { Usuario } from "../repository/entity/Usuario";
import { CriarUsuario, ObterPorCpf } from "./UsuarioService"

interface IAcidente {
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

const _acidenteRepository = AppDataSource.getRepository(Acidente);


export var ObterTodosAcidentes = async function (): Promise<Acidente[]> {
  const listAcidentes = await _acidenteRepository.find({
    relations: {
      FkIdUsuarioTerceiros: true,
      FkIdUsuarioCliente: true
    },
  });

  return listAcidentes;
};

export var ObterAcidentePorId = async function (
  Acidenteid: number
): Promise<Acidente> {
  const acidente = await _acidenteRepository.findOne({
    where: {
      Id: Acidenteid,
    },
    relations: {
      FkIdUsuarioTerceiros: true,
      FkIdUsuarioCliente: true
    },
  });

  return acidente;
};

export var ObterPorIdUsuario = async function (
  id: number
): Promise<Acidente> {

    const acidente = await _acidenteRepository.findOne({
      where: {
        Id: id,
      },
      relations: {
        FkIdUsuarioTerceiros: true,
        FkIdUsuarioCliente: true
      },
    });

    return acidente;
  
};

export var CriarAcidente = async function (acidente: Acidente): Promise<Acidente> {


    var usuarioList: Usuario[] = new Array<Usuario>()

     acidente.FkIdUsuarioTerceiros.forEach(async usuario => {

      var usuarioBanco: Usuario = await ObterPorCpf(usuario.Cpf)

      if(usuarioBanco == null){
        usuario = await  CriarUsuario(usuario)
        usuarioList.push(usuario)
      }else{
        usuarioList.push(usuarioBanco)
      }
      
      
    });

    acidente.FkIdUsuarioTerceiros = usuarioList;

    var acidenteCriado = await _acidenteRepository.manager.save(acidente);


  return acidenteCriado;
};



