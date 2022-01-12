import './style.scss';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactImageGallery from 'react-image-gallery';
import ReactInputMask from 'react-input-mask';
import { useCarrinho } from '../../hooks/useCarrinho';
import { IProduto, IProdutoProps } from '../../interfaces';
import { formatPrice } from '../../utils/formart';
import isMobile from '../../utils/isMobile';
import { textToHtml } from '../../utils/textToHtml';

type TImgFormatted = {
  thumbnail: string;
  original: string;
  thumbnailClass: string;
};

interface IKeyVaricao {
  [key: string]: string | number;
}

interface IVariacao extends IKeyVaricao {
  nome: string;
  estoque: number;
  codigo: string;
}

interface IProdFormatted extends IProdutoProps {
  precoFormatted: string;
  imagemFormatted: TImgFormatted[];
  variacoesFormatted?: IVariacao[];
}

let i = 1;

const GradeVariations = ({ data }: { data: IVariacao[] | IVariacao | any }) => {
  console.log('data', data);

  const [variacao, setVaricao] = useState({
    base: '',
    array: ''
  });

  useEffect(() => {
    const obj: any = Object.entries(data).slice(-1)[0];

    setVaricao({
      base: obj[0],
      array: obj[1]
    });
  }, [setVaricao]);

  return (
    <>
      <div className="grade">
        <strong className="d-block">{variacao.base}</strong>
      </div>
      <div className="grade-variations">
        {!!variacao.array &&
          Object.values(variacao.array).map((loop: any, ii: number) => (
            <span key={`${ii}`}>{loop.nome}</span>
          ))}
      </div>

      {!!variacao.array &&
        Object.values(variacao.array).map(
          (loop: any, iii: number) =>
            Object.entries(loop).slice(-1)[0] && (
              <GradeVariations
                data={{
                  [Object.entries(loop).slice(-1)[0][0]]: Object.entries(loop).slice(-1)[0][1]
                }}
                key={iii}
              />
            )
        )}
    </>
  );

  // !!Object.entries(loop).slice(-1)[0] && <>adsass fasdfadaf</>;

  // <GradeVariations data={Object.entries(loop).slice(-1)[0]} key={ii++} />
  // return (
  //   <>
  //     {Object.keys(data).map((k, i) => (
  //       <div className="grade" key={`grade_${i}`}>
  //         <strong className="d-block">{k}</strong>
  //         {!!data[k] &&
  //           data[k].map((loop: IVariacao, ii: number) => (
  //             // <span key={`span_${i}`} className={`${loop.estoque === '0' && 'out-of-stock'}`}>
  //             <>
  //               <span key={`span_${ii}`}>{loop.nome}</span>
  //               {console.log(Object.entries(loop).slice(-1))}
  //               {/* {!!Object.entries(loop).slice(-1) && (
  //                 <GradeVariations data={Object.entries(loop).slice(-1)} key={ii} />
  //               )} */}
  //             </>
  //           ))}
  //       </div>
  //     ))}
  //   </>
  // );
};

const ProdutosDetalhes = ({ resource }: any) => {
  let temp1: any = [],
    temp2: any = [],
    keys: string[];

  const { addItem } = useCarrinho();

  const isTestMobile = isMobile();

  const produtos = resource.produtosDetalhes.read();

  const formattedProduct = produtos.reduce(
    (formattedProducts: IProdFormatted, p: IProduto<IProdutoProps>) => {
      return (formattedProducts = {
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
          return obj;
        }, {} as IVariacao),

        imagemFormatted:
          p.produto?.imagem?.map((pi) => {
            return {
              thumbnail: pi.link,
              original: pi.link,
              thumbnailClass: 'active-store'
            };
          }) || []
      });
    },
    {}
  );

  return (
    <section className="pb-5 pt-4 pt-md-5 bg-white">
      <div className="container-md">
        <div className="row row-cols-12 justify-content-between">
          {/* <div
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all'
              }}>
              {JSON.stringify(formattedProduct, null, '  ')}
            </div> */}

          <h1 className="h2 mb-3 col-12">{!!formattedProduct && formattedProduct?.descricao}</h1>

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

            <ReactImageGallery
              lazyLoad={true}
              thumbnailPosition={isTestMobile ? 'bottom' : 'left'}
              showNav={false}
              showPlayButton={false}
              items={formattedProduct?.imagemFormatted || []}
              additionalClass="gallery-store"
              key={'ImageGallery'}
            />
          </div>

          <div className="col-md-4 p-3 shadow-md">
            <span className="text-danger h3">{formattedProduct?.precoFormatted}</span>
            <div className="mt-3 mx-0"></div>

            {!!formattedProduct.variacoesFormatted && (
              <GradeVariations data={formattedProduct.variacoesFormatted} key={1} />
            )}

            <section className="mt-3">
              <button
                className="btn btn-primary text-uppercase text-white btn-lg"
                onClick={() => addItem(formattedProduct?.codigo || 0)}>
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

          {!!formattedProduct?.descricaoCurta && (
            <>
              <div className="col-md-12 border-bottom mt-3 mb-3"></div>
              <div className="col-md-8">
                <h4>Descrição</h4>
                {textToHtml(formattedProduct.descricaoCurta)}
              </div>
            </>
          )}

          {!!formattedProduct?.descricaoComplementar && (
            <>
              <div className="col-md-12 border-bottom mt-3 mb-3"></div>
              <div className="col-md-8">
                <h4>Informações Técnicas</h4>
                {textToHtml(formattedProduct.descricaoComplementar)}
              </div>
            </>
          )}

          {!!formattedProduct?.observacoes && (
            <>
              <div className="col-md-12 border-bottom mt-3 mb-3"></div>
              <div className="col-md-8">
                <h4>Outras informações</h4>
                {textToHtml(formattedProduct.observacoes)}
              </div>
            </>
          )}
        </div>
      </div>
      <Helmet>
        <title>{formattedProduct?.descricao}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={formattedProduct?.descricao} />
        <meta property="og:description" content={formattedProduct?.descricaoCurta} />

        <meta name="description" content="index,follow" />
        <meta name="keywords" content="index,follow" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* <meta property="og:image" content={formattedProduct?.imageThumbnail} /> */}
    </section>
  );
};

export default ProdutosDetalhes;
