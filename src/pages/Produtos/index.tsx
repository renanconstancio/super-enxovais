import { lazy, Suspense } from 'react';

import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import ImageRenderer from '../../components/ImageRenderer';

import createResource from '../../api/createResource';
import { wrapPromise } from '../../api/wrapPromise';
import { apiProdutosSearch } from '../../api/apiProdutosSearch';
import { useParams } from 'react-router-dom';

const Menu = lazy(() => import('../../components/Menu'));
const ProdutosLista = lazy(() => import('../../components/ProdutosLista'));

const resource = createResource();

const Produtos = () => {
  const { categoria } = useParams();

  const resourceProdutos = { produtos: wrapPromise(apiProdutosSearch({ data: { categoria } })) };

  // console.log('resourceProdutos', resourceProdutos.produtos.read());

  return (
    <>
      <Topo />

      <Suspense
        fallback={
          <nav className="bg-secondary d-none d-md-block">
            <div className="container">
              <div className="row">
                <ul className="menu placeholder-glow d-flex flex-row justify-content-between align-self-center">
                  {[1, 2, 3, 4, 5].map((x) => (
                    <li className="pt-2 pb-2 pe-4 ps-4 menu-item placeholder" key={x}>
                      <span>menu</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        }>
        <Menu resource={resource} />
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

          <div className="row row-cols-1 row-cols-md-2">
            <div className="col-12 col-md-2 d-none d-md-block">
              <h5 className="bg-primary p-2 text-white text-uppercase">Categorias</h5>
            </div>
            <div className="col-12 d-md-none d-block mb-2 d-flex justify-content-between">
              <button className="btn btn-outline-primary btn-sm text-uppercase">
                <i className="fas fa-filter"></i> filtros
              </button>
              {/* <button className="btn btn-outline-primary btn-sm text-uppercase">
                <i className="fas fa-sort"></i> ordem
              </button> */}
            </div>
            <div className="col-12 col-md-10">
              <section className="row row-cols-2 row-cols-md-3 g-1 g-md-3">
                <Suspense
                  fallback={[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div className="col" key={i}>
                      <div className="card shadow-md mb-3 rounded-0" aria-hidden="true">
                        <ImageRenderer
                          width={375}
                          height={375}
                          url="/loading.jpg"
                          thumb="/loading.jpg"
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            <span className="placeholder w-100">Loading</span>
                          </h5>
                          <p className="card-text">
                            <span className="placeholder d-block w-50 mb-1">Loading</span>
                            <span className="placeholder w-100 p-2">Loading</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}>
                  <ProdutosLista resource={resourceProdutos} />
                </Suspense>
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
