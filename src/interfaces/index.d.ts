export interface IBling<T> {
  retorno: T;
}

export interface IProdutos<T> {
  produtos: T[];
}

export interface IProduto<T> {
  produto: T;
}

export interface IVariacaoProps {
  id?: string;
  nome: string;
  codigo: string;
  estoqueAtual: number;
}

export interface IVariacao<T> {
  variacao: T;
}

export interface IVariacaoTree {
  id?: string;
  nome: string;
  codigo: string;
  estoque: number;
  children?: IVariacaoTree[];
}

export interface IImagem {
  link: string;
  validade: string;
  tipoArmazenamento: string;
}

export interface IProdutoProps {
  id: number;
  codigo: string;
  descricao: string;
  preco: number;
  precoCusto?: number;
  marca?: string;
  descricaoCurta?: string;
  qtde?: number;
  pesoBruto?: number;
  larguraProduto?: string;
  alturaProduto?: string;
  profundidadeProduto?: string;
  estoqueMinimo: number;
  estoqueMaximo: number;
  imageThumbnail: string | null;
  situacao: string;
  tipo: string;
  variacoes?: IVariacao[];
  imagem?: IImagem[];
  codigoPai?: string;
}

export interface ICarrinho {
  id: number;
  codigo: string | number;
  descricao: string;
  preco: number;
  qtde: number;
  image: string;
  variacao?: [];
}

// export // interface IMenuList {
// //   id: string;
// //   text: string;
// //   data: [];
// // }

// export // interface IMenu {
// //   data: [];
// // }

export interface TMenusTree {
  id: string;
  text: string;
  data?: readonly TMenusTree[];
}
