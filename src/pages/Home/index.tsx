import { lazy, Suspense } from 'react';

import Topo from '../../components/Topo';

const Banners = lazy(() => import('../../components/Banners'));
const Produtos = lazy(() => import('../../components/Produtos'));
const Menu = lazy(() => import('../../components/Menu'));

const Home = () => {
  return (
    <>
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

      <Suspense
        fallback={
          <section className="pt-2 pt-md-0 container-md">
            <div className="row">
              <div style={{ height: '190px' }} className="placeholder p-5"></div>
            </div>
          </section>
        }>
        <Banners />
      </Suspense>

      <section className="bg-white">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <h1 className="fw-bold text-uppercase">Produtos em Destaque</h1>
            </div>
          </div>
          <div className="row g-0 g-md-3 row-cols-2 row-cols-md-4">
            <Suspense
              fallback={[1, 2, 3, 4].map((i) => (
                <div className="card mb-3" aria-hidden="true" key={i}>
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder"></span>
                      <span className="placeholder"></span>
                    </p>
                  </div>
                </div>
              ))}>
              <Produtos />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
