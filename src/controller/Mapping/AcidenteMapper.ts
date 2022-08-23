import * as AcidenteInterface from "../Interfaces/InterfaceAcidente"
import { Acidente } from "../../repository/entity/Acidente";
import { Endereco } from "../../repository/entity/Endereco";
import { Usuario } from "../../repository/entity/Usuario";
import { ClientRequest } from "http";
import { array } from "joi";

export async function MapeiaAcidenteCreate(IAcidente: AcidenteInterface.CriarAcidenteRequest): Promise<Acidente> {

    const AcidenteMapeado: Acidente = new Acidente();
    AcidenteMapeado.FkIdUsuarioCliente = new Usuario();
    AcidenteMapeado.FkIdUsuarioTerceiros = new Array<Usuario>()

    AcidenteMapeado.Id = null;
    AcidenteMapeado.Data = IAcidente.payload.data;
    AcidenteMapeado.VeiculoCliente = IAcidente.payload.veiculoCliente;
    AcidenteMapeado.VeiculoTerceiro = IAcidente.payload.veiculoTerceiro;
    AcidenteMapeado.Descricao = IAcidente.payload.descricao
    AcidenteMapeado.FkIdUsuarioCliente.Id = IAcidente.payload.idCliente


    
    IAcidente.payload.terceiros.forEach(terceiro => {
        
        const terceiroUsuario: Usuario = new Usuario();

        terceiroUsuario.Id = null
        terceiroUsuario.Nome = terceiro.nome
        terceiroUsuario.Cpf = terceiro.cpf
        terceiroUsuario.Telefone = terceiro.telefone
        terceiroUsuario.Ativo = false
        terceiroUsuario.Cliente = false

        terceiroUsuario.Endereco = new Endereco();

        terceiroUsuario.Endereco.Id = null;
        terceiroUsuario.Endereco.Lagradouro = terceiro.endereco.lagradouro;
        terceiroUsuario.Endereco.Bairro = terceiro.endereco.bairro;
        terceiroUsuario.Endereco.Cidade = terceiro.endereco.cidade;
        terceiroUsuario.Endereco.Estado = terceiro.endereco.estado;
        terceiroUsuario.Endereco.Numero = terceiro.endereco.numero;
        terceiroUsuario.Endereco.Complemento = terceiro.endereco.complemento;


        AcidenteMapeado.FkIdUsuarioTerceiros.push(terceiroUsuario)
    });

    return AcidenteMapeado;


}