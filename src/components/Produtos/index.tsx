import { useEffect, useState } from 'react';

import api from '../../api/api';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../../interfaces';
import { formatPrice } from '../../utils/formart';
import Card from '../Card';

interface ProdutoFormatted extends IProdutoProps {
  precoFormatted: string;
}

const Produtos = () => {
  const [products, setProducts] = useState<ProdutoFormatted[]>();

  useEffect(() => {
    async function loadProducts() {
      try {
        const {
          data: {
            retorno: { produtos }
          }
        } = await api.get<IBling<IProdutos<IProduto<ProdutoFormatted>>>>(
          `/produtos/json?apikey=${process.env.REACT_APP_API_KEY}&filters=tipo[P]&situacao=Ativo&imagem=S&estoque=S`
        );

        const formattedProducts = produtos
          .filter(
            ({ produto: p }: IProduto<ProdutoFormatted>) =>
              !p.codigoPai && (p.imageThumbnail || p.imagem?.length)
          )
          .map(({ produto: p }: IProduto<ProdutoFormatted>) => ({
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
      {products &&
        products.map((rws, i) => (
          <Card
            key={i}
            id={rws.id}
            descricao={rws.descricao}
            precoPor={rws.precoFormatted}
            codigo={rws.codigo}
            imagens={rws.imagem}
            itens={[]}
          />
        ))}
    </>
  );
};

export default Produtos;
