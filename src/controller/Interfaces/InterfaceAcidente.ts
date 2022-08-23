  
  export interface ObterPorIdRequest extends Request{
    query:{
      Id: number;
    }
      
  }
  
  
  export interface CriarAcidenteRequest extends Request{
    payload: {
      data: Date;
      veiculoCliente: string;
      veiculoTerceiro?: string;
      descricao?: string;
      idCliente: number;
      terceiros: [{
        nome:string
        cpf: string
        telefone:string
        endereco:{
          lagradouro: string;
          bairro: string;
          cidade: string;
          estado: string;
          numero: number;
          complemento: string;
        }
      }]
      };
    }
      