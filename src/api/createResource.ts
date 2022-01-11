import { wrapPromise } from './wrapPromise';

import { apiBanners } from './apiBanners';
import { apiMenus } from './apiMenus';
import { apiProdutos } from './apiProdutos';
// import { apiProdutosDetalhes } from './apiProdutosDetalhes';

export default function createResource() {
  return {
    menus: wrapPromise(apiMenus()),
    produtos: wrapPromise(apiProdutos()),
    banners: wrapPromise(apiBanners())
    // produtosDetalhes: wrapPromise(apiProdutosDetalhes()),
    // add here
  };
}
