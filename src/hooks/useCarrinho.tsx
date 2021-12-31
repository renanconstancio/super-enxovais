//github.com/martins-rafael/lunarshoes/blob/master/src/hooks/useCart.tsx
import api from '../api/api';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useToasts } from './useToasts';
import { IBling, ICarrinho, IProduto, IProdutoProps, IProdutos } from '../interfaces';

type CarProviderProps = {
  children: ReactNode;
};

type IUPCarrinho = {
  id: number;
  codigo: string;
  qtde: number;
};

type CarContextData = {
  carrinho: ICarrinho[];
  addItem: (codId: number | string) => Promise<void>;
  updateItem: ({ id, codigo, qtde }: IUPCarrinho) => void;
  removeItem: (produtoId: number) => void;
  toastMessage: (msg: string) => void;
  canvasCarrinho: () => void;
};

const CarContext = createContext<CarContextData>({} as CarContextData);

export function CarrinhoProvider({ children }: CarProviderProps) {
  const { add } = useToasts();

  const [carrinho, setCarrinho] = useState<ICarrinho[]>(() => {
    const storagedCarrinho = localStorage.getItem('@Cart:list');

    if (storagedCarrinho) {
      return JSON.parse(storagedCarrinho);
    }

    return [];
  });

  const addItem = async (codId: number | string) => {
    try {
      const productInCart = carrinho.findIndex(
        (product: { codigo: string | number }) => `${product.codigo}` === `${codId}`
      );

      let newCart = [...carrinho];

      if (productInCart !== -1) {
        const {
          data: {
            retorno: {
              produtos: [{ produto }]
            }
          }
        } = await api.get<IBling<IProdutos<IProduto<IProdutoProps>>>>(
          `/produto/${codId}/json?apikey=${process.env.REACT_APP_API_KEY}`
        );

        if (carrinho[productInCart].qtde < produto.estoqueMaximo) {
          alert('Quantidade solicitada fora de estoque');
          return;
        }

        newCart[productInCart].qtde += 1;
        setCarrinho(newCart);
      } else {
        const {
          data: {
            retorno: {
              produtos: [{ produto }]
            }
          }
        } = await api.get<IBling<IProdutos<IProduto<IProdutoProps>>>>(
          `/produto/${codId}/json?apikey=${process.env.REACT_APP_API_KEY}`
        );

        newCart = [
          ...carrinho,
          {
            id: produto.id,
            codigo: produto.codigo,
            descricao: produto.descricao,
            preco: produto.preco,
            image: '',
            qtde: 1,
            variacao: []
          }
        ];

        setCarrinho(newCart);
      }

      localStorage.setItem('@Cart:list', JSON.stringify(newCart));
      add('Produto adicionado!');
    } catch (e) {
      console.log('Error: %O', e);
    }
  };

  const removeItem = (produtoId: number) => {
    try {
      const prodInCart = carrinho.findIndex((p) => p.id === produtoId);
      if (prodInCart === -1) {
        alert('Erro na remoção do produto');
        return;
      }

      const upCart = carrinho.filter((p) => p.id !== produtoId);
      setCarrinho(upCart);

      localStorage.setItem('@Cart:list', JSON.stringify(upCart));
    } catch {
      alert('Erro na remoção do produto');
    }
  };

  const updateItem = async ({ id, qtde }: IUPCarrinho) => {
    try {
      if (qtde <= 0) return;
      const productInCart = carrinho.findIndex((product) => product.id === id);
      if (productInCart === -1) {
        // toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      // const { data: stock } = await api.get<ICarrinho>(`stock/${id}`);
      // const productUnavaliable = qtde > stock.qtde;
      // if (productUnavaliable) {
      //   // toast.error("Quantidade solicitada fora de estoque");
      //   return;
      // }

      const updatedCart = [...carrinho];

      updatedCart[productInCart].qtde = qtde;
      setCarrinho(updatedCart);

      localStorage.setItem('@Cart:list', JSON.stringify(updatedCart));
    } catch {
      // setToastMessage.error("Erro na alteração de quantidade do produto");
    }
  };

  const canvasCarrinho = () => {
    // const carrinhoRight = document.getElementById("clickCarrinhoRight");
    // if (carrinhoRight) {
    //   carrinhoRight.click();
    // }
  };

  const toastMessage = (msg: string) => {
    add(msg);
  };

  return (
    <CarContext.Provider
      value={{
        carrinho,
        addItem,
        removeItem,
        updateItem,
        toastMessage,
        canvasCarrinho
      }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCarrinho(): CarContextData {
  const context = useContext(CarContext);

  return context;
}
