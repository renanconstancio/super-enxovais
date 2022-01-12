import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';

import createResource from '../../api/createResource';
import ImageRenderer from '../../components/ImageRenderer';

const Menu = lazy(() => import('../../components/Menu'));
const Banners = lazy(() => import('../../components/Banners'));
const ProdutosLista = lazy(() => import('../../components/ProdutosLista'));

const resource = createResource();

const Home = () => {
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
          <div className="bg-white">
            <div className="container-md pt-4">
              <div className="row placeholder-glow bg-dark">
                <span style={{ width: '100%', height: '205px' }} className="placeholder d-block">
                  Banners
                </span>
              </div>
            </div>
          </div>
        }>
        <Banners resource={resource} />
      </Suspense>

      <section className="bg-white">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <h1 className="fw-bold text-uppercase h3">Produtos em Destaque</h1>
              <div className="border-bottom mb-3"></div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-4 g-1 g-md-3 placeholder-glow">
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
              <ProdutosLista resource={resource} />
            </Suspense>
          </div>
        </div>
      </section>

      <Rodape />

      <Helmet>
        <title>{process.env.REACT_APP_TITLE}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        <meta name="description" content="index,follow" />
        <meta name="keywords" content="index,follow" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
    </>
  );
};

export default Home;
