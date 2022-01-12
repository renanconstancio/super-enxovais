import api from './api';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../interfaces';
import { slugiFy } from '../utils/slugiFy';
import { formatPrice } from '../utils/formart';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

export const apiProdutosSearch = async ({ data }: any) => {
  // console.log('apiProdutosSearch', data.categoria);

  let respData: any[] = [];

  return await api
    .get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
      `/produtos/json&apikey=${process.env.REACT_APP_API_KEY}&filters=tipo[P]&situacao=Ativo&imagem=S&estoque=S`
    )
    .then((resp) => {
      if (resp.data.retorno.erros == undefined) {
        // Tenta buscar os filtros
        if (data.categoria !== undefined)
          respData = resp.data.retorno.produtos.filter(
            ({ produto: p }: IProduto<IProdFormatted>) =>
              slugiFy(`${p.categoria?.descricao}`) == data.categoria
          );

        return (respData.length > 0 ? respData : resp.data.retorno.produtos)
          .filter(
            ({ produto: p }: IProduto<IProdFormatted>) =>
              !p.codigoPai && (p.imageThumbnail || p.imagem?.length)
          )
          .map(({ produto: p }: IProduto<IProdFormatted>) => ({
            ...p,
            precoFormatted: formatPrice(p.preco)
          }));
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
