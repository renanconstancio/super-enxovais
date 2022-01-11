import api from './api';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../interfaces';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

export const apiProdutosDetalhes = async (codigo?: string) => {
  return await api
    .get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
      `/produto/${codigo}/json&apikey=${process.env.REACT_APP_API_KEY}&imagem=S&estoque=S`
    )
    .then((resp) => {
      if (resp.data.retorno.erros == undefined) {
        return resp.data.retorno.produtos;
      } else {
        return resp.data.retorno.erros[0].erro.msg;
      }
    })
    .catch((erro) => {
      console.error('Erro no método apiProdutos() da classe BlingAPI: ');
      console.error(erro);
      return erro.toString();
    });
};
