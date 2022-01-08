import './style.scss';

import api from '../../api/api';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formart';

import ProdutoError from './error';

import isMobile from '../../utils/isMobile';
import {
  IBling,
  IProduto,
  IProdutoProps,
  IProdutos,
  IVariacao,
  IVariacaoProps,
  IVariacaoTree
} from '../../interfaces';
import { useCarrinho } from '../../hooks/useCarrinho';
import { Helmet } from 'react-helmet';

const ImageGallery = lazy(() => import('react-image-gallery'));
const Menu = lazy(() => import('../../components/Menu'));

import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import ReactInputMask from 'react-input-mask';
import { textToHtml } from '../../utils/textToHtml';

type TImgFormatted = {
  thumbnail: string;
  original: string;
  thumbnailClass: string;
};

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
  imagemFormatted: TImgFormatted[];
  variacoesFormatted?: any[];
}

const Produto = () => {
  const { addItem } = useCarrinho();

  const isTestMobile = isMobile();

  console.log(isTestMobile);

  const { codigo } = useParams();

  const [loading, setLoading] = useState({
    loading: false,
    productExists: true
  });

  const [product, setProduct] = useState<IProdFormatted>();

  const [variations, setVariations] = useState<IVariacaoTree[]>();

  useEffect(() => {
    async function loadProducts() {
      try {
        const {
          data: {
            retorno: { produtos }
          }
        } = await api.get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
          `/produto/${codigo}/json?apikey=${process.env.REACT_APP_API_KEY}&imagem=S&estoque=S`
        );

        let temp: any = [];
        let keys: string[];

        const formattedProduct = produtos.reduce((products, p) => {
          return (products = {
            ...p.produto,
            precoFormatted: formatPrice(p.produto.preco),

            variacoesFormatted: p.produto.variacoes?.reduce((obj, { variacao: rws }) => {
              keys = rws.nome.split(/[\\:\\;]+/);

              if (!obj[keys[0]]) obj[keys[0]] = [];

              if (keys[0]) {
                if (!obj[keys[0]].find((q: any) => q.nome === keys[1]))
                  obj[keys[0]] = [
                    ...obj[keys[0]],
                    {
                      nome: keys[1],
                      // codigo: rws.codigo,
                      // estoque: rws.estoqueAtual,
                      [keys[2]]: []
                    }
                  ];
              }

              // if (!obj[keys[0]][keys[2]]) obj[keys[0]][keys[2]] = [];

              // if (keys[2]) {
              //   obj[keys[0]] = [
              //     ...obj[keys[0]],
              //     [keys[2]]: [{
              //       nome: keys[3]
              //       // codigo: rws.codigo,
              //       // estoque: rws.estoqueAtual,
              //     }]
              //   ];

              //   //   ...obj[keys[0]],
              //   //   {
              //   //     [keys[2]]: {
              //   //       nome: keys[3],
              //   //       codigo: rws.codigo,
              //   //       estoque: rws.estoqueAtual
              //   //     }
              //   //   }
              //   // ];
              // }

              return obj;
            }, {}),

            imagemFormatted:
              p.produto?.imagem?.map((pi) => {
                return {
                  thumbnail: pi.link,
                  original: pi.link,
                  thumbnailClass: 'active-store'
                };
              }) || []
          });
        }, {} as IProdFormatted);

        setProduct(formattedProduct);
        setVariations(formattedProduct.variacoesFormatted);

        setLoading({
          loading: true,
          productExists: true
        });
      } catch (error) {
        console.log('error', error);
        setLoading({
          loading: true,
          productExists: false
        });
      }
    }

    loadProducts();
  }, [codigo, setLoading]);

  // const handleGradeVariations = (data: IVariacaoTree) => {
  //   console.log('data', data);
  //   product?.variacoes
  //     ?.filter(({ variacao: p }) => p.codigo === data.codigo)
  //     .map(({ variacao: r }) => {
  //       console.log('r', r);
  //     });
  // };

  // return (
  //   <>
  //     <div
  //       style={{
  //         whiteSpace: 'pre-wrap',
  //         wordBreak: 'keep-all'
  //       }}>
  //       {JSON.stringify(variations, null, '  ')}
  //     </div>
  //     {/* {variations?.map((loop, i) => (
  //       <Teste data={loop} key={i} />
  //     ))} */}
  //   </>
  // );

  return (
    <>
      {/* {!loading.loading && <Loading />} */}

      <Topo />

      <Suspense
        fallback={
          <section className="container-md">
            <div className="row">
              <div style={{ height: '55px' }} className="placeholder p-5"></div>
            </div>
          </section>
        }>
        <Menu />
      </Suspense>

      {/* varificação se tem encontrado o produto */}
      {loading.productExists ? (
        <section className="pb-5 pt-1 pt-md-5 bg-white">
          <div className="container-md">
            <div className="row row-cols-12 justify-content-between">
              <h1 className="h2 mb-3 col-12">{product?.descricao}</h1>

              <div className="col-md-5">
                <small className="d-block mb-3 text-uppercase">
                  <i className="fas fa-star ms-1"></i>
                  <i className="fas fa-star ms-1"></i>
                  <i className="fas fa-star ms-1"></i>
                  <i className="fas fa-star-half-alt ms-1"></i>
                  <i className="far fa-star ms-1"></i>
                  <span className="ms-2">(3.3) 18 avaliações</span>
                  <i className="fas fa-heart ms-2"></i>
                  <i className="fas fa-share ms-2"></i>
                </small>

                <Suspense
                  fallback={
                    <div
                      style={{ width: '100%', height: '300px' }}
                      className="placeholder p-5"></div>
                  }>
                  <ImageGallery
                    lazyLoad={true}
                    thumbnailPosition={isTestMobile ? 'bottom' : 'left'}
                    showNav={false}
                    showPlayButton={false}
                    items={product?.imagemFormatted || []}
                    additionalClass="gallery-store"
                  />
                </Suspense>
              </div>

              <div className="col-md-5 border-top p-3 shadow-md">
                {/* <small>COD: {variations?.filter((r) => r.codigo === product?.codigo)}</small>{' '} */}
                {/* <span className="d-block border-bottom mt-2 mb-3"></span> */}
                <span className="text-danger h3">{product?.precoFormatted}</span>
                <div className="mt-3 mx-0"></div>

                {/* {!!variations && <GradeVariations data={variations} key={0} />} */}

                <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'keep-all'
                  }}>
                  {JSON.stringify(variations, null, '  ')}
                </div>

                <section className="mt-3">
                  <button
                    className="btn btn-primary text-uppercase text-white btn-lg"
                    onClick={() => addItem(product?.codigo || 0)}>
                    <i className="fas fa-credit-card"></i> comprar
                  </button>
                </section>
              </div>
              <div className="col-md-12 border-bottom mt-3 mb-3"></div>
              <div className="col-md-4">
                <h4>Consultar frete e prazo de entrega</h4>
                <div className="form-group mt-3 mb-4">
                  <ReactInputMask
                    mask="99999-999"
                    type={'tel'}
                    className="form-control"
                    id="inputCep"
                    placeholder="Digite seu CEP"
                    style={{ width: 'auto' }}
                  />
                  <label htmlFor="inputCep" className="form-control-placeholder">
                    Digite seu CEP
                  </label>
                </div>
              </div>

              {!!product?.descricaoCurta && (
                <>
                  <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                  <div className="col-md-8">
                    <h4>Descrição</h4>

                    {textToHtml(product.descricaoCurta)}
                  </div>
                </>
              )}
              {!!product?.descricaoComplementar && (
                <>
                  <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                  <div className="col-md-8">
                    <h4>Informações Técnicas</h4>
                    {textToHtml(product.descricaoComplementar)}
                  </div>
                </>
              )}
              {!!product?.observacoes && (
                <>
                  <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                  <div className="col-md-8">
                    <h4>Outras informações</h4>
                    {textToHtml(product.observacoes)}
                  </div>
                </>
              )}
            </div>
          </div>
          <Helmet>
            <title>{product?.descricao}</title>
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={product?.descricao} />
            <meta property="og:description" content={product?.descricaoCurta} />

            <meta name="description" content="index,follow" />
            <meta name="keywords" content="index,follow" />
            <meta name="robots" content="index,follow" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          {/* <meta property="og:image" content={product?.imageThumbnail} /> */}
        </section>
      ) : (
        <>
          <ProdutoError />

          <Helmet>
            <title>Ops... Produto Indisponível</title>
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={product?.descricao} />
            <meta property="og:description" content={product?.descricaoCurta} />

            <meta name="description" content="noindex,follow" />
            <meta name="keywords" content="noindex,follow" />
            <meta name="robots" content="noindex,follow" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
        </>
      )}
      <Rodape />
    </>
  );
};

let i = 1;
const GradeVariations = ({ data }: { data: IVariacaoTree[] | undefined }) => {
  return (
    <>
      <div className="grade" key={`grade_${i++}`}>
        {!!data &&
          data.map((rws) => (
            <>
              <strong className="d-block">{rws.nome}</strong>
              {!!rws.children &&
                rws.children.map((loop, i) => (
                  <span key={`span_${i}`} className={`${loop.estoque === 0 && 'out-of-stock'}`}>
                    {loop.nome}
                  </span>
                ))}
            </>
          ))}
      </div>

      {!!data &&
        data.map((rws1) => (
          <>
            {!!rws1.children &&
              rws1.children.map((loop1, ii) => (
                <>{!!loop1.children && <GradeVariations data={loop1.children} key={ii} />}</>
              ))}
          </>
        ))}
    </>
  );
};

// <Grade nome={rws.nome} key={0}>
//   {!!rws.children &&
//     rws.children.map((loop, ii) => (
//       <>
//         {loop.children ? (
//           <GradeVariations data={loop.children} />
//         ) : (
//           <span key={`${0}_${ii}`} className={`${loop.estoque === 0 && 'out-of-stock'}`}>
//             {loop.nome}
//           </span>
//         )}
//       </>
//     ))}

//   {rws.children?.length === 0 ? (
//     rws.children.map((loop, ii) => (
//       <span key={`${0}_${ii}`} className={`${loop.estoque === 0 && 'out-of-stock'}`}>
//         {loop.nome}
//       </span>
//     ))
//   ) : (
//     <>{rws.nome}</>
//   )}
// </Grade>

export default Produto;
