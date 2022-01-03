import { useEffect, useState } from 'react';

import api from '../../api/api';
import { useCarrinho } from '../../hooks/useCarrinho';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../../interfaces';
import { formatPrice } from '../../utils/formart';
import Card from '../Card';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

interface ICartItemsAmount {
  [key: number]: number;
}

const Produtos = () => {
  const { carrinho, addItem } = useCarrinho();

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
      } catch (error) {
        console.log(error);
        return <>asdfasd</>;
      }
    }

    loadProducts();
  }, []);

  return (
    <>
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
                  <span className="placeholder d-block w-50">Loading</span>
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
    </>
  );
};

export default Produtos;
