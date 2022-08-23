export interface IUsuarioRequest {
    Cliente: {
      Id: number;
      Nome: string;
      Cpf: string;
      CNH: string;
      Telefone: string;
      Email: string;
      Ativo: boolean;
      Cliente: boolean;
      Endereco: {
        Id: number;
        Lagradouro: string;
        Bairro: string;
        Cidade: string;
        Estado: string;
        Numero: number;
        Complemento: string;
      };
    };
  }
  
  export interface ObterPorIdRequest extends Request{
    query:{
      Id: number;
    }
      
  }
  
  export interface EditarUsuarioRequest extends Request{
    payload: {
      Cliente: {
        Id?: number;
        Nome: string;
        Cpf: string;
        CNH: string;
        Telefone: string;
        Email: string;
        Ativo?: boolean;
        Cliente?: boolean;
        Endereco: {
          Id?: number;
          Lagradouro: string;
          Bairro: string;
          Cidade: string;
          Estado: string;
          Numero: number;
          Complemento: string;
        };
      };
    }
      
  }
  
  export interface CriarUsuarioRequest extends Request{
    payload: {
      Cliente: {
        Nome: string;
        Cpf: string;
        CNH: string;
        Telefone: string;
        Email: string;
        Endereco: {
          Lagradouro: string;
          Bairro: string;
          Cidade: string;
          Estado: string;
          Numero: number;
          Complemento: string;
        };
      };
    }
      
  }
  
   export interface ObterPorIdRequest extends Request{
    query:{
      Id: number;
    }
      
  }