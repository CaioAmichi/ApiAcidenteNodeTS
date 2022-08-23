import * as _controller from "../controller/UsuarioController";
import Joi from "@hapi/joi";

export var usuarioRoutes = [
  {
    method: "GET",
    path: "/usuario/obtertodos",
    handler: _controller.ObterTodosUsuario,
  },

  {
    method: "GET",
    path: "/usuario/obterporid",
    options: {
      auth: false,
      validate: {
        query: Joi.object({
          Id: Joi.number(),
        }),
      },
    },
    handler: _controller.ObterUsuarioPorId,
  },

  {
    method: "POST",
    path: "/usuario/criar",
    options: {
        auth: false,
        validate: {
          payload: Joi.object({
            Cliente: {
              Nome: Joi.string(),
              Cpf: Joi.string(),
              CNH: Joi.string().allow(null),
              Telefone: Joi.string(),
              Email: Joi.string(),
              Endereco: {
                Lagradouro: Joi.string(),
                Bairro: Joi.string(),
                Cidade: Joi.string(),
                Estado: Joi.string(),
                Numero: Joi.number(),
                Complemento: Joi.string().allow(null),
              },
            },
          }),
        },
      },
    handler: _controller.AdicionarUsuario,
  },

  {
    method: "POST",
    path: "/usuario/editar",
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          Cliente: {
            Id: Joi.number(),
            Nome: Joi.string(),
            CNH: Joi.string().allow(null),
            Telefone: Joi.string(),
            Email: Joi.string(),
            Cliente: Joi.boolean(),
            Ativo: Joi.boolean(),
            Endereco: {
              Id: Joi.number(),
              Lagradouro: Joi.string(),
              Bairro: Joi.string(),
              Cidade: Joi.string(),
              Estado: Joi.string(),
              Numero: Joi.number(),
              Complemento: Joi.string().allow(null),
            },
          },
        }),
      },
    },
    handler: _controller.EditarUsuario,
  },
];
