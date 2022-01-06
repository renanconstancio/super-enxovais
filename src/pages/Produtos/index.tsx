import { lazy, Suspense, useEffect, useState } from 'react';

import api from '../../api/api';
import { useCarrinho } from '../../hooks/useCarrinho';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../../interfaces';
import { formatPrice } from '../../utils/formart';
import Card from '../../components/Card';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { useParams } from 'react-router-dom';
import { slugiFy } from '../../utils/slugiFy';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

interface ICartItemsAmount {
  [key: number]: number;
}

const Menu = lazy(() => import('../../components/Menu'));

const Produtos = () => {
  const { categoria } = useParams();

  const { carrinho, addItem } = useCarrinho();

  const [load, setLoad] = useState(true);
  const [products, setProducts] = useState<IProdFormatted[]>();

  const carrinhoItemsQtde = carrinho.reduce((sumAmount, product) => {
    return (sumAmount = {
      ...sumAmount,
      [product.id]: product.qtde
    });
  }, {} as ICartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      try {
        const {
          data: {
            retorno: { produtos }
          }
        } = await api.get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
          `/produtos/json?apikey=${process.env.REACT_APP_API_KEY}&filters=tipo[P]&situacao=Ativo&imagem=S&estoque=S`
        );

        produtos.filter(({ produto: p }: IProduto<IProdFormatted>) =>
          console.log(slugiFy(`${p.categoria?.descricao}`), categoria)
        );

        const formattedProducts = produtos
          .filter(
            ({ produto: p }: IProduto<IProdFormatted>) =>
              slugiFy(`${p.categoria?.descricao}`) === `${categoria}`
          )
          .map(({ produto: p }: IProduto<IProdFormatted>) => ({
            ...p,
            precoFormatted: formatPrice(p.preco)
          }));

        setProducts(formattedProducts);
        setLoad(false);
      } catch (error) {
        console.log(error);
        return <>asdfasd</>;
      }
    }

    loadProducts();
  }, [categoria]);

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

      <section className="bg-white">
        <div className="container-md pt-5 pb-5">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row row-cols-md-2">
            <div className="col-2 col-md-2">asdfasdfasdfsd</div>
            <div className="col-10 col-md-10">
              <section className="row row-cols-2 row-cols-md-4 g-1 g-md-3">
                {products?.length === 0 && (
                  <div className="col-12 col-md-12 h4 text-center">Nenhum produto encontrado</div>
                )}
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
                  products?.map((rws, i) => (
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
              </section>
            </div>
          </div>
        </div>
      </section>

      <Rodape />
    </>
  );
};

export default Produtos;
