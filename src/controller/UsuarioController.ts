import { Usuario } from "../repository/entity/Usuario";
import * as _usuarioService from "../service/UsuarioService";
import * as Hapi from "hapi";
import * as UsuarioInterface from "./Interfaces/InterfaceUsuario"
import * as UsuarioMapper from "./Mapping/UsuarioMapper"
import * as Utils from "../Utils/funcoesGlobais"



interface Validator {
  valido: boolean;
  erro?: string;
}



const ValidaUsuario = async function (
  usuario: Usuario
): Promise<Validator> {
  
  var validate: Validator = {} as Validator;
  validate.valido = true;

  var regexEmail = /\S+@\S+\.\S+/;

  if (usuario.Id != null && usuario.Id < 0) {
    validate.valido = false;
    validate.erro = "Id Inválido";
  }
  
  if (usuario.Nome == null) {
    validate.valido = false;
    validate.erro = "Nome Vazio";
  }

  if (usuario.Cpf != null && !Utils.CpfValidator.isCpfValid(usuario.Cpf)) {
    validate.valido = false;
    validate.erro = "Cpf Inválido";
  }
  

  if (usuario.Email != null && !regexEmail.test(usuario.Email)) {
    validate.valido = false;
    validate.erro = "Email Inválido";
  }

  if (usuario.Endereco.Lagradouro == null) {
    validate.valido = false;
    validate.erro = "Lagradouro Invalido";
  }


  if (usuario.Endereco.Bairro == null) {
    validate.valido = false;
    validate.erro = "Bairro Invalido";
  }
  

  if (usuario.Endereco.Cidade == null) {
    validate.valido = false;
    validate.erro = "Cidade Invalido";
  }
 

  if (usuario.Endereco.Estado == null) {
    validate.valido = false;
    validate.erro = "Estado Invalido";
  }
  

  if (usuario.Endereco.Numero == null) {
    validate.valido = false;
    validate.erro = "Numero Invalido";
  }


  return validate;
};


export const ObterTodosUsuario = async (
  request,
  response: Hapi.ResponseToolkit
) => {
  const usuarios = await _usuarioService.ObterTodosUsuarios();

  if (usuarios.length == 0) {
    return response.response("Não encontrado").code(204);
  }

  return response.response(usuarios).code(200);
};

export const ObterUsuarioPorId = async (
  request: UsuarioInterface.ObterPorIdRequest,
  response: Hapi.ResponseToolkit
) => {
  
  if (request == null || request.query.Id < 0) {
    return response.response("Id Enviado Invalido").code(400);
  }

  const usuario = await _usuarioService.ObterUsuarioPorId(request.query.Id);

  if (usuario == null) {
    return response.response().code(204);
  }

  return response.response(usuario).code(200);
};

export const AdicionarUsuario = async (
  request: UsuarioInterface.CriarUsuarioRequest,
  response: Hapi.ResponseToolkit
) => {
  try{

  const usuario: Usuario = await UsuarioMapper.MapeiaUsuarioCreate(request);

  var valido = await ValidaUsuario(usuario);
  if (valido.valido == false) {
    return response.response(valido.erro).code(400);
  }
  
  var usuarioExiste = await _usuarioService.ObterPorCpf(usuario.Cpf)

  if(usuarioExiste != null && usuarioExiste.Cliente == false)
  {
    usuario.Id = usuarioExiste.Id
    usuario.Cliente = true;
    usuario.Ativo = true;
    usuario.Endereco.Id = usuarioExiste.Endereco.Id

    await _usuarioService.EditarUsuario(usuario);

    return response.response("Cadastro já foi feito anteriormente, houve apenas uma atualização dos dados").code(200);
  }
  else{
    
    usuario.Cliente = true;
    usuario.Ativo = true;
  
  
    await _usuarioService.CriarUsuario(usuario);
  
    return response.response("Usuario criado com sucesso").code(200);
  }


}
  catch(erro){
    return response.response(erro).code(404);
  }
};

export var EditarUsuario = async (
  request: UsuarioInterface.EditarUsuarioRequest,
  response: Hapi.ResponseToolkit
) => {

try {
  const usuario: Usuario = await UsuarioMapper.MapeiaUsuarioEdit(request);
  
  var valido: Validator = await ValidaUsuario(usuario);

  if (valido.valido == false) {
    return response.response(valido.erro).code(400);
  }

  
  const usuarioBanco = await _usuarioService.ObterUsuarioPorId(usuario.Id);

  if(usuarioBanco == null){
    return response.response("Envie um id valido").code(400);
  }

  if (usuarioBanco.Endereco.Id != usuario.Endereco.Id) {
    return response.response("Mande o Id de Endereço Igual ao Original").code(400);
  }

  
  await _usuarioService.EditarUsuario(usuario);

  return response.response("Editado com sucesso").code(200);
} catch (error) {
  return response.response(error).code(404);
}

};
