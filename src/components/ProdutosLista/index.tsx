import { useCarrinho } from '../../hooks/useCarrinho';
import { IProduto, IProdutoProps } from '../../interfaces';
import { formatPrice } from '../../utils/formart';
import Card from '../Card';

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
}

interface ICartItemsAmount {
  [key: number]: number;
}

const ProdutosLista = ({ resource }: any) => {
  const { carrinho, addItem } = useCarrinho();

  const produtos = resource.produtos.read();

  const carrinhoItemsQtde = carrinho.reduce((sumAmount, product) => {
    return (sumAmount = {
      ...sumAmount,
      [product.id]: product.qtde
    });
  }, {} as ICartItemsAmount);

  const formattedProducts = produtos
    .filter(
      ({ produto: p }: IProduto<IProdFormatted>) =>
        !p.codigoPai && (p.imageThumbnail || p.imagem?.length)
    )
    .map(({ produto: p }: IProduto<IProdFormatted>) => ({
      ...p,
      precoFormatted: formatPrice(p.preco)
    }));

  return (
    <>
      {!!formattedProducts &&
        formattedProducts.map((rws: IProdFormatted, i: number) => (
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

export default ProdutosLista;
