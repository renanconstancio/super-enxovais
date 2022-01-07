import { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import api from '../../api/api';
import { useCarrinho } from '../../hooks/useCarrinho';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../../interfaces';
import { formatPrice } from '../../utils/formart';

import Card from '../../components/Card';
import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

interface ICartItemsAmount {
  [key: number]: number;
}

const Banners = lazy(() => import('../../components/Banners'));
const Menu = lazy(() => import('../../components/Menu'));

const Home = () => {
  const { carrinho, addItem } = useCarrinho();

  const [products, setProducts] = useState<IProdFormatted[]>();

  const carrinhoItemsQtde = carrinho.reduce((sumAmount, product) => {
    return (sumAmount = {
      ...sumAmount,
      [product.id]: product.qtde
    });
  }, {} as ICartItemsAmount);

  useEffect(() => {
    const loadProducts = async () => {
      const produtos = await api
        .get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
          `/produtos/json?apikey=${process.env.REACT_APP_API_KEY}&filters=tipo[P]&situacao=Ativo&imagem=S&estoque=S`
        )
        .then((resp) => {
          if (resp.data.retorno.erros == undefined) {
            return resp.data.retorno.produtos;
          } else {
            throw resp.data.retorno.erros[0].erro.msg;
          }
        })
        .catch((erro) => {
          console.error('Erro no método getProdutoPorCodigo(codigo) da classe BlingAPI: ');
          console.error(erro);
          throw erro.toString();
        });

      const formattedProducts = produtos
        .filter(
          ({ produto: p }: IProduto<IProdFormatted>) =>
            !p.codigoPai && (p.imageThumbnail || p.imagem?.length)
        )
        .map(({ produto: p }: IProduto<IProdFormatted>) => ({
          ...p,
          precoFormatted: formatPrice(p.preco)
        }));

      setProducts(formattedProducts);
    };

    // async function loadProducts() {
    //   try {
    //     const {
    //       data: {
    //         retorno: { produtos }
    //       }
    //     } = await api.get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
    //       `/produtos/json?apikey=${process.env.REACT_APP_API_KEY}&filters=tipo[P]&situacao=Ativo&imagem=S&estoque=S`
    //     );

    //     const formattedProducts = produtos
    //       .filter(
    //         ({ produto: p }: IProduto<IProdFormatted>) =>
    //           !p.codigoPai && (p.imageThumbnail || p.imagem?.length)
    //       )
    //       .map(({ produto: p }: IProduto<IProdFormatted>) => ({
    //         ...p,
    //         precoFormatted: formatPrice(p.preco)
    //       }));

    //     setProducts(formattedProducts);
    //   } catch (error) {
    //     console.log(error);
    //     return <>asdfasd</>;
    //   }
    // }

    loadProducts();
  }, []);

  return (
    <>
      <Topo />

      <Suspense
        fallback={
          <section className="pt-2 pt-md-0 container-md">
            <div className="row">
              <div style={{ height: '55px' }} className="placeholder p-5">
                a
              </div>
            </div>
          </section>
        }>
        <Menu />
      </Suspense>

      <Suspense
        fallback={
          <section className="pt-2 pt-md-0 container-md">
            <div className="row">
              <div style={{ height: '190px' }} className="placeholder p-5"></div>
            </div>
          </section>
        }>
        <Banners />
      </Suspense>

      <section className="bg-white">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <h1 className="fw-bold text-uppercase">Produtos em Destaque</h1>
              <div className="border-bottom mb-3"></div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-4 g-1 g-md-3">
            {!products &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div className="col" key={i}>
                  <div className="card mb-3" aria-hidden="true">
                    <div className="card-body">
                      <span className="placeholder w-100 p-5">Loading</span>
                      <h5 className="card-title placeholder-glow">
                        <span className="placeholder w-100">Loading</span>
                      </h5>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder d-block w-50 mb-1">Loading</span>
                        <span className="placeholder w-100 p-2">Loading</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {products &&
              products.map((rws, i) => (
                <Card
                  key={i}
                  id={rws.id}
                  descricao={rws.descricao}
                  precoPor={rws.precoFormatted}
                  codigo={rws.codigo}
                  imagens={rws.imagem}
                  addItemClick={() => addItem(rws.codigo)}
                  itens={carrinhoItemsQtde}
                />
              ))}
          </div>
        </div>
      </section>

      <Rodape />

      <Helmet>
        <title>{process.env.REACT_APP_TITLE}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        <meta name="description" content="index,follow" />
        <meta name="keywords" content="index,follow" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
    </>
  );
};

export default Home;
