import './style.scss';

import api from '../../api/api';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formart';

import ProdutoError from './error';

import isMobile from '../../utils/isMobile';
import { IBling, IProduto, IProdutoProps, IProdutos } from '../../interfaces';
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

type TVariacao = {
  [x: string]: {
    nome: string;
    estoque: number;
    codigo: string;
  };
};

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
  imagemFormatted: TImgFormatted[];
  variacoesFormatted?: any[];
}

const Produto = () => {
  const { addItem } = useCarrinho();

  const isTestMobile = isMobile();

  const { codigo } = useParams();

  const [loading, setLoading] = useState({
    loading: false,
    productExists: true
  });

  const [product, setProduct] = useState<IProdFormatted>();

  const [variations, setVariations] = useState<TVariacao[]>();

  useEffect(() => {
    async function loadProducts() {
      try {
        const {
          data: {
            retorno: { produtos }
          }
        } = await api.get<IBling<IProdutos<IProduto<IProdFormatted>>>>(
          `/produto/${codigo}/json&apikey=${process.env.REACT_APP_API_KEY}&imagem=S&estoque=S`
        );

        let temp1: any = [];
        let temp2: any = [];
        let keys: string[];

        const formattedProduct = produtos.reduce((products, p) => {
          return (products = {
            ...p.produto,
            precoFormatted: formatPrice(p.produto.preco),

            variacoesFormatted: p.produto.variacoes?.reduce((obj, { variacao: rws }) => {
              keys = rws.nome.split(/[\\:\\;]+/);

              if (!temp1[keys[2]]) temp1[keys[2]] = [];
              if (!temp2[keys[0]]) temp2[keys[0]] = [];

              if (keys[0]) {
                if (!temp2[keys[0]].find((q: any) => q.nome === keys[1]))
                  temp2[keys[0]] = [
                    ...temp2[keys[0]],
                    {
                      nome: keys[1],
                      codigo: rws.codigo,
                      estoque: parseInt(rws.estoqueAtual)
                    }
                  ];
              }

              if (keys[2]) {
                if (!temp1[keys[2]].find((q: any) => q.nome === keys[3]))
                  temp1[keys[2]] = [
                    ...temp1[keys[2]],
                    {
                      nome: keys[3],
                      codigo: rws.codigo,
                      estoque: parseInt(rws.estoqueAtual),
                      ...temp2
                    }
                  ];
              }

              obj = { ...temp1 };
            }, {} as TVariacao),

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

  return (
    <>
      {/* {!loading.loading && <Loading />} */}
      <Topo />

      <Menu />

      <section className="pb-5 pt-1 pt-md-5 bg-white">
        <div className="container-md">
          <div className="row row-cols-12 justify-content-between">
            <h1 className="h2 mb-3 col-12">{!!product && product?.descricao}</h1>

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

              <ImageGallery
                lazyLoad={true}
                thumbnailPosition={isTestMobile ? 'bottom' : 'left'}
                showNav={false}
                showPlayButton={false}
                items={product?.imagemFormatted || []}
                additionalClass="gallery-store"
                key={'ImageGallery'}
              />
            </div>

            <div className="col-md-5 p-3 shadow-md">
              <span className="text-danger h3">{product?.precoFormatted}</span>
              <div className="mt-3 mx-0"></div>

              {/* {!!variations && <GradeVariations data={variations} key={0} />} */}

              {/* <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'keep-all'
                  }}>
                  {JSON.stringify(variations, null, '  ')}
                </div> */}

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
                  key={'CEP'}
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

      {/* varificação se tem encontrado o produto */}
      {/* {loading.productExists ? (
        
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
      )} */}
      <Rodape />
    </>
  );
};

const GradeVariations = ({ data }: { data: TVariacao[] | TVariacao | any }) => {
  // let i = 1;
  // let ii = 1;
  return (
    <>
      {Object.keys(data).map((k, i) => (
        <div className="grade" key={`grade_${i}`}>
          <strong className="d-block">{k}</strong>
          {!!data[k] &&
            data[k].map((loop: TVariacao, ii: number) => (
              // <span key={`span_${i}`} className={`${loop.estoque === '0' && 'out-of-stock'}`}>
              <>
                <span key={`span_${ii}`}>s{loop.nome}</span>
                {/* <GradeVariations data={loop} key={ii} /> */}

                {console.log('loop->', loop)}
              </>
            ))}
        </div>
      ))}
    </>
  );
};

export default Produto;
