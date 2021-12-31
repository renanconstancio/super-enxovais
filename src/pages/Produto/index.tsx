import './style.scss';

import api from '../../api/api';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formart';

import ProdutoError from './error';

import isMobile from '../../utils/isMobile';
import { IBling, IProduto, IProdutoProps, IProdutos, IVariacaoTree } from '../../interfaces';
import { useCarrinho } from '../../hooks/useCarrinho';
import { Helmet } from 'react-helmet';

const ImageGallery = lazy(() => import('react-image-gallery'));
const Titles = lazy(() => import('../../components/Titles'));
const Menu = lazy(() => import('../../components/Menu'));

import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';

type TImgFormatted = {
  thumbnail: string;
  original: string;
  thumbnailClass: string;
};

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
  variacoesFormatted: IVariacaoTree[];
  imagemFormatted: TImgFormatted[];
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

        let temp = {};
        let keys: string[];

        const formattedProduct = produtos.reduce((products, p) => {
          return (products = {
            ...p.produto,
            precoFormatted: formatPrice(p.produto.preco),
            variacoesFormatted: Object.values(
              p.produto.variacoes?.reduce((obj: any, { variacao: rws }) => {
                keys = rws.nome.split(/[\\:\\;]+/);

                if (keys[2] && keys[3])
                  [keys[2], keys[3]].reduce((o, nome) => {
                    temp = (o.children = o.children || []).find(
                      (q: IVariacaoTree) => q.nome === nome
                    );

                    if (!temp)
                      o.children.push(
                        (temp = {
                          nome: nome,
                          codigo: rws.codigo,
                          estoque: rws.estoqueAtual
                        })
                      );

                    return temp;
                  }, obj);

                if (keys[0] && keys[1])
                  [keys[3], keys[0], keys[1]].reduce((o, nome) => {
                    temp = (o.children = o.children || []).find(
                      (q: IVariacaoTree) => q.nome === nome
                    );

                    if (!temp)
                      o.children.push(
                        (temp = {
                          nome: nome,
                          codigo: rws.codigo,
                          estoque: rws.estoqueAtual
                        })
                      );
                    return temp;
                  }, obj);

                // keys.reduce((o, nome) => {
                //   temp = (o.children = o.children || []).find(
                //     (q: IVariacaoTree) => q.nome === nome
                //   );

                //   if (!temp)
                //     o.children.push(
                //       (temp = {
                //         nome: nome,
                //         codigo: rws.codigo,
                //         estoque: rws.estoqueAtual,
                //       })
                //     );

                //   return temp;
                // }, obj);

                return obj;
              }, {} as IVariacaoTree).children
            ),

            // variacoesFormatted: Object.values(
            //   p.produto.variacoes?.reduce((acc: any, { variacao: obj }, i) => {
            //     // converte uma string em array
            //     keys = obj.nome.split(/[\\:\\;]+/);

            //     key = slugiFy(`${keys[3]} ${keys[2]}`);
            //     key1 = slugiFy(`${[keys[1]]} ${keys[3]} ${keys[2]}`);

            //     children[key1] = {
            //       id: keys[0],
            //       nome: keys[1],
            //       codigo: obj.codigo,
            //     };

            //     if (!acc[key]) acc[key] = [];

            //     chlidOld = acc[key].children ? acc[key].children : [];

            //     acc[key] = {
            //       id: keys[2],
            //       nome: keys[3],
            //       codigo: obj.codigo,
            //       children: [...chlidOld, children[key1]],
            //     };

            //     return acc;
            //   }, {})
            // ),

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
        setLoading({
          loading: true,
          productExists: false
        });
      }
    }

    loadProducts();
  }, [codigo, setLoading]);

  const handleGradeVariations = (data: IVariacaoTree) => {
    console.log('data', data);
    product?.variacoes
      ?.filter(({ variacao: p }) => p.codigo === data.codigo)
      .map(({ variacao: r }) => {
        console.log('r', r);
      });
  };

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
          <section className="pt-2 pt-md-0 container-md">
            <div className="row">
              <div style={{ height: '55px' }} className="placeholder p-5"></div>
            </div>
          </section>
        }>
        <Menu />
      </Suspense>

      {/* varificação se tem encontrado o produto */}
      {loading.productExists ? (
        <section className="mt-5 mt-md-0 pt-3 pt-md-0 pb-5 bg-white">
          <div className="container-md">
            <div className="row g-0 g-md-3 row-cols-12">
              <Suspense
                fallback={<div style={{ width: '100%' }} className="placeholder p-2"></div>}>
                <Titles texto={product?.descricao} classe="h2 mb-4 d-block d-md-none" />
              </Suspense>

              <div className="col-md-7">
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

              <div className="col-md-5 border rounded p-3 shadow-md">
                <h1 className="h2 mb-0 d-none d-md-block">{product?.descricao}</h1>
                <small>COD: {variations?.filter((r) => r.codigo === product?.codigo)}</small>

                <small className="d-block mt-2 text-uppercase">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <i className="far fa-star"></i>

                  <span>(3.3) 18 avaliações</span>
                </small>
                <span className="d-block border-bottom mt-2 mb-3"></span>
                <span className="text-danger h3">{product?.precoFormatted}</span>

                <div className="mt-3 mx-0"></div>

                {/* {variations &&
                    variations?.map((rws, i) => (
                      <GradeVariations
                        key={i}
                        data={rws}
                        fromHandleGradeVariations={handleGradeVariations}
                      />
                    ))} */}

                {/* <div
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'keep-all'
                    }}>
                    {JSON.stringify({ A: variations }, null, '  ')}
                  </div> */}

                <section className="mt-3">
                  <button
                    className="btn btn-primary text-uppercase text-white btn-lg"
                    onClick={() => addItem(product?.codigo || 0)}>
                    <i className="fas fa-credit-card"></i> comprar
                  </button>
                </section>
              </div>
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

const Teste = ({ data }: any) => {
  return (
    <div>
      <strong>{data.nome}</strong>

      {data?.children
        .filter((f: any) => {
          // console.log("children", f.children);
          return f.nome === 'Azul';
        })
        .children.map((data0: any, i: number) => (
          <span key={i}>{data0.nome}</span>
        ))}

      {/* {data?.children
        .filter((f: any) => {
          return f.nome === "Azul";
        })
        .map((data0: any) => (
          <span>{data0.nome}</span>
        ))} */}
    </div>
  );
};

const GradeVariations = ({
  data,
  fromHandleGradeVariations: fromHandleChildren
}: {
  data: IVariacaoTree;
  fromHandleGradeVariations(args: any): void;
}) => {
  return (
    <div className="grade">
      <strong>{data.nome}</strong>
      <div>
        {data?.children?.map((data0, i) => (
          <>
            <span
              key={i}
              onClick={(e) => fromHandleChildren(data0)}
              className={`${data0.estoque === 0 && 'out-of-stock'}`}>
              {data0.nome}
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Produto;
