import { lazy, Suspense } from 'react';

const Menu = lazy(() => import('../../components/Menu'));

import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import createResource from '../../api/createResource';
import ProdutosDetalhes from '../../components/ProdutosDetalhes';
import { apiProdutosDetalhes } from '../../api/apiProdutosDetalhes';
import { useParams } from 'react-router-dom';
import { wrapPromise } from '../../api/wrapPromise';
import ImageRenderer from '../../components/ImageRenderer';

const resource = createResource();

const Produto = () => {
  const { codigo } = useParams();

  const resourceProdutos = { produtosDetalhes: wrapPromise(apiProdutosDetalhes(codigo)) };

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

      <Suspense
        fallback={
          <section className="pb-5 pt-4 pt-md-5 bg-white">
            <div className="container-md">
              <div className="row row-cols-12 justify-content-between placeholder-glow">
                <h1 className="h2 mb-3 col-12 placeholder w-75">title</h1>

                <div className="col-md-5">
                  <small className="d-block mb-3 text-uppercase">
                    <i className="fas fa-star ms-1 placeholder"></i>
                    <i className="fas fa-star ms-1 placeholder"></i>
                    <i className="fas fa-star ms-1 placeholder"></i>
                    <i className="fas fa-star ms-1 placeholder"></i>
                    <i className="far fa-star ms-1 placeholder"></i>
                    <i className="far fa-star ms-1 ms-2 placeholder w-25"></i>
                    <i className="fas fa-heart ms-2 placeholder"></i>
                    <i className="fas fa-share ms-2 placeholder"></i>
                  </small>

                  <ImageRenderer width={500} height={500} url="loading.jpg" thumb="loading.jpg" />
                </div>

                <div className="col-md-5 p-3 shadow-md">
                  <span className="text-danger h3 placeholder w-50">price</span>
                  <div className="mt-3 mx-0"></div>

                  <small className="d-block mb-3 text-uppercase">
                    <span className="ms-1 placeholder w-50 d-block mb-3">1</span>
                    <span className="ms-1 placeholder">1</span>
                    <span className="ms-1 placeholder">1</span>
                    <span className="ms-1 placeholder">1</span>
                    <div className="mb-2"></div>
                    <span className="ms-1 placeholder w-50 d-block mb-3">1</span>
                    <span className="ms-2 placeholder">1</span>
                    <span className="ms-2 placeholder">1</span>
                  </small>

                  <section className="mt-3">
                    <button className="btn btn-primary text-uppercase text-white btn-lg placeholder">
                      comprar
                    </button>
                  </section>
                </div>

                <div className="col-md-12 border-bottom mt-3 mb-3"></div>

                <div className="col-md-8">
                  <h4>Consultar frete e prazo de entrega</h4>
                  <div className="form-group mt-3 mb-4">
                    <input
                      type={'tel'}
                      className="form-control form-control-placeholder"
                      id="inputCep"
                      placeholder="Digite seu CEP"
                      style={{ width: 'auto' }}
                    />
                    <label htmlFor="inputCep" className="form-control-placeholder">
                      Digite seu CEP
                    </label>
                  </div>
                </div>

                <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                <div className="col-md-8">
                  <h4 className="placeholder">Descrição</h4>
                  <div className="placeholder w-100">Descrição</div>
                </div>
                <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                <div className="col-md-8">
                  <h4 className="placeholder">Descrição</h4>
                  <div className="placeholder w-100">Descrição</div>
                </div>
                <div className="col-md-12 border-bottom mt-3 mb-3"></div>
                <div className="col-md-8">
                  <h4 className="placeholder">Descrição</h4>
                  <div className="placeholder w-100">Descrição</div>
                </div>
              </div>
            </div>
          </section>
        }>
        <ProdutosDetalhes resource={resourceProdutos} />
      </Suspense>

      <Rodape />
    </>
  );
};

export default Produto;
