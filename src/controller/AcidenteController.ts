import { Acidente } from "../repository/entity/Acidente";
import * as _acidenteService from "../service/AcidenteService";
import {  ObterPorCpf, ObterUsuarioPorId } from "../service/UsuarioService";
import * as Hapi from "hapi";
import * as AcidenteInterface from "./Interfaces/InterfaceAcidente"
import * as AcidenteMapper from "./Mapping/AcidenteMapper"
import * as Utils from "../Utils/funcoesGlobais"
import { Usuario } from "../repository/entity/Usuario";

interface Validator {
  valido: boolean;
  erro?: string;
}

const ValidaAcidente = async function (
  acidente: Acidente
): Promise<Validator> {

  var validate: Validator = {} as Validator;
  validate.valido = true;
  

  if (acidente.Data == null) {
    validate.valido = false;
    validate.erro = "Data Vazio";
  }


  if (acidente.VeiculoCliente == null) {
    validate.valido = false;
    validate.erro = "Veiculo Vazio";
  }

  acidente.FkIdUsuarioTerceiros.forEach(terceiro => {
    
 
    if (terceiro.Nome == null) {
      validate.valido = false;
      validate.erro = "Nome do Terceiro Vazio";
    }


    if (terceiro.Cpf == null || !Utils.CpfValidator.isCpfValid(terceiro.Cpf)) {
      validate.valido = false;
      validate.erro = "Cpf do Terceiro " + terceiro.Nome + " Inválido";
    }

  
    if (terceiro.Endereco.Lagradouro == null) {
      validate.valido = false;
      validate.erro = "Lagradourodo Terceiro " + terceiro.Nome + " Invalido";
    }
  

    if (terceiro.Endereco.Bairro == null) {
      validate.valido = false;
      validate.erro = "Bairro do Terceiro " + terceiro.Nome + "  Invalido";
    }
    
   
    if (terceiro.Endereco.Cidade == null) {
      validate.valido = false;
      validate.erro = "Cidade do Terceiro " + terceiro.Nome + "  Invalido";
    }
   
  
    if (terceiro.Endereco.Estado == null) {
      validate.valido = false;
      validate.erro = "Estado do Terceiro " + terceiro.Nome + "  Invalido";
    }
    
 
    if (terceiro.Endereco.Numero == null) {
      validate.valido = false;
      validate.erro = "Numero do Terceiro " + terceiro.Nome + "  Invalido";
    }
  });
  
  return validate;
};


export const ObterTodosAcidente = async (
  request,
  response: Hapi.ResponseToolkit
) => {
  const Acidentes = await _acidenteService.ObterTodosAcidentes();

  if (Acidentes.length == 0) {
    return response.response("Não encontrado").code(204);
  }

  return response.response(Acidentes).code(200);
};

export const ObterAcidentePorId = async (
  request: AcidenteInterface.ObterPorIdRequest,
  response: Hapi.ResponseToolkit
) => {
  
  if (request == null || request.query.Id < 0) {
    return response.response("Id Enviado Invalido").code(400);
  }

  const Acidente = await _acidenteService.ObterAcidentePorId(request.query.Id);

  if (Acidente == null) {
    return response.response().code(204);
  }

  return response.response(Acidente).code(200);
};

export const AdicionarAcidente = async (
  request: AcidenteInterface.CriarAcidenteRequest,
  response: Hapi.ResponseToolkit
) => {
  try{

  var cpfIgual: boolean

  const acidente: Acidente = await AcidenteMapper.MapeiaAcidenteCreate(request);

  console.log(acidente)
  console.log(acidente.Data)

  var valido = await ValidaAcidente(acidente);
  if (valido.valido == false) {
    return response.response(valido.erro).code(400);
  }

  acidente.FkIdUsuarioCliente = await ObterUsuarioPorId(acidente.FkIdUsuarioCliente.Id)


  if(acidente.FkIdUsuarioCliente == null){
    return response.response("Cliente enviado errado").code(400);
  }
  
  acidente.FkIdUsuarioTerceiros.forEach(terceiro => {
    if(terceiro.Cpf == acidente.FkIdUsuarioCliente.Cpf){
      cpfIgual = true
    }
  });

  if(cpfIgual == true){
    return response.response("Você não pode ser o terceiro e o acidentado").code(400);
  }
  
  await _acidenteService.CriarAcidente(acidente);
  
  return response.response("Acidente criado com sucesso").code(200);
  
}
  catch(erro){
    return response.response(erro).code(404);
  }
};

