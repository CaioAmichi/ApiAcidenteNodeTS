import * as _controller from "../controller/AcidenteController";
import DateExtension from '@joi/date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;

export var acidenteRoutes = [
  {
    method: "GET",
    path: "/acidente/obtertodos",
    handler: _controller.ObterTodosAcidente,
  },

  {
    method: "GET",
    path: "/acidente/obterporid",
    options: {
      auth: false,
      validate: {
        query: Joi.object({
          Id: Joi.number(),
        }),
      },
    },
    handler: _controller.ObterAcidentePorId,
  },

  {
    method: "GET",
    path: "/acidente/obterporidusuario",
    options: {
      auth: false,
      validate: {
        query: Joi.object({
          Id: Joi.number(),
        }),
      },
    },
    handler: _controller.ObterAcidentePorIdUsuario,
  },

  {
    method: "POST",
    path: "/acidente/criar",
    options: {
        auth: false,
        validate: {
          payload: Joi.object({
              data: Joi.date().format('DD-MM-YYYY').utc(),
              veiculoCliente: Joi.string(),
              veiculoTerceiro: Joi.string().allow(null),
              descricao: Joi.string().allow(null),
              idCliente: Joi.number(),
              terceiros: Joi.array().items(Joi.object({
                nome:Joi.string(),
                cpf:Joi.string(),
                telefone:Joi.string(),
                endereco: {
                  lagradouro: Joi.string(),
                  bairro: Joi.string(),
                  cidade: Joi.string(),
                  estado: Joi.string(),
                  numero: Joi.number(),
                  complemento: Joi.string().allow(null),
                }


              }))

          }),
        },
      },
    handler: _controller.AdicionarAcidente,
  },

];
