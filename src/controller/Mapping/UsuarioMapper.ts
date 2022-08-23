import * as UsuarioInterface from "../Interfaces/InterfaceUsuario"
import { Usuario } from "../../repository/entity/Usuario";
import { Endereco } from "../../repository/entity/Endereco";

export async function MapeiaUsuarioEdit(Iusuario: UsuarioInterface.EditarUsuarioRequest): Promise<Usuario> {
    const usuarioMapeado: Usuario = new Usuario();

    usuarioMapeado.Id = Iusuario.payload.Cliente.Id;
    usuarioMapeado.Nome = Iusuario.payload.Cliente.Nome;
    usuarioMapeado.Cpf = null;
    usuarioMapeado.CNH = Iusuario.payload.Cliente.CNH;
    usuarioMapeado.Telefone = Iusuario.payload.Cliente.Telefone;
    usuarioMapeado.Email = Iusuario.payload.Cliente.Email;
    usuarioMapeado.Cliente = Iusuario.payload.Cliente.Cliente;
    usuarioMapeado.Ativo = Iusuario.payload.Cliente.Ativo;

    usuarioMapeado.Endereco = new Endereco();

    usuarioMapeado.Endereco.Id = Iusuario.payload.Cliente.Endereco.Id;
    usuarioMapeado.Endereco.Lagradouro = Iusuario.payload.Cliente.Endereco.Lagradouro;
    usuarioMapeado.Endereco.Bairro = Iusuario.payload.Cliente.Endereco.Bairro;
    usuarioMapeado.Endereco.Cidade = Iusuario.payload.Cliente.Endereco.Cidade;
    usuarioMapeado.Endereco.Estado = Iusuario.payload.Cliente.Endereco.Estado;
    usuarioMapeado.Endereco.Numero = Iusuario.payload.Cliente.Endereco.Numero;
    usuarioMapeado.Endereco.Complemento = Iusuario.payload.Cliente.Endereco.Complemento;

    return usuarioMapeado;
}

export async function MapeiaUsuarioCreate(Iusuario: UsuarioInterface.CriarUsuarioRequest): Promise<Usuario> {
    const usuarioMapeado: Usuario = new Usuario();

    usuarioMapeado.Id = null;
    usuarioMapeado.Nome = Iusuario.payload.Cliente.Nome;
    usuarioMapeado.Cpf = Iusuario.payload.Cliente.Cpf;
    usuarioMapeado.CNH = Iusuario.payload.Cliente.CNH;
    usuarioMapeado.Telefone = Iusuario.payload.Cliente.Telefone;
    usuarioMapeado.Email = Iusuario.payload.Cliente.Email
    usuarioMapeado.Cliente = null;
    usuarioMapeado.Ativo = null;

    usuarioMapeado.Endereco = new Endereco();

    usuarioMapeado.Endereco.Id = null;
    usuarioMapeado.Endereco.Lagradouro = Iusuario.payload.Cliente.Endereco.Lagradouro;
    usuarioMapeado.Endereco.Bairro = Iusuario.payload.Cliente.Endereco.Bairro;
    usuarioMapeado.Endereco.Cidade = Iusuario.payload.Cliente.Endereco.Cidade;
    usuarioMapeado.Endereco.Estado = Iusuario.payload.Cliente.Endereco.Estado;
    usuarioMapeado.Endereco.Numero = Iusuario.payload.Cliente.Endereco.Numero;
    usuarioMapeado.Endereco.Complemento = Iusuario.payload.Cliente.Endereco.Complemento;

    return usuarioMapeado;
}