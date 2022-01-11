import api from './api';
import { IBling, ICategoria, ICategorias, TCategoriaProps } from '../interfaces';

export const apiMenus = async () => {
  return await api
    .get<IBling<ICategorias<ICategoria<TCategoriaProps>>>>(
      `/categorias/json&apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((resp) => {
      if (resp.data.retorno.erros == undefined) {
        return resp.data.retorno.categorias;
      } else {
        return resp.data.retorno.erros[0].erro.msg;
      }
    })
    .catch((erro) => {
      console.error('Erro no método apiMenus() da classe BlingAPI: ');
      console.error(erro);
      return erro.toString();
    });
};
