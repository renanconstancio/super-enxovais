import { Link, useLocation } from 'react-router-dom';
import { boasVindas } from '../../utils/boasVindas';
import CarrinhoCanvas from '../CarrinhoCanvas';

import MenuMobile from '../MenuMobile';
import Search from '../Search';
import createResource from '../../api/createResource';
import { lazy, Suspense } from 'react';
import { useCarrinho } from '../../hooks/useCarrinho';

const MenuCanvas = lazy(() => import('../MenuCanvas'));

const resource = createResource();

const Topo = () => {
  const { carrinho } = useCarrinho();

  const { pathname } = useLocation();

  const qtdeCar = carrinho?.reduce((sumQtde, product) => {
    return (sumQtde += product.qtde);
  }, 0);

  const page = pathname.split('/')[1];

  return (
    <header>
      <MenuMobile />

      <Suspense fallback={<span className="d-none">...</span>}>
        <MenuCanvas resource={resource} />
      </Suspense>

      <CarrinhoCanvas />
      <section className="container-md d-block d-md-none bg-light py-2 fixed-top">
        <div className="row align-items-center justify-content-between">
          <section className="col-2">
            <div className="dropdown">
              <span
                className="btn btn-dark"
                id="clickMenuMobile"
                data-bs-toggle="offcanvas"
                data-bs-target="#menuMobile"
                aria-controls="menuMobile">
                <i className="fas fa-bars"></i>
              </span>
            </div>
          </section>
          <section className="col-6 text-center">
            <Link to="/">
              <img src="/logo-mobile.png" alt="Logo Mobile" className="img-fluid" />
            </Link>
          </section>
          <section className="col-4 d-flex justify-content-evenly">
            <span className="btn btn-sm">
              <i
                className="fas fa-search text-primary"
                style={{ fontSize: '25px' }}
                data-bs-toggle="collapse"
                data-bs-target="#searchCollapse"
                aria-expanded="false"
                aria-controls="searchCollapse"></i>
            </span>

            <div className="fixed-top p-3 bg-light collapse" id="searchCollapse">
              <Search />
            </div>

            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoRight"
              aria-controls="carrinhoRight"
              className="btn btn-sm position-relative w-50 text-center m-auto"
              style={{ cursor: 'pointer' }}>
              <i
                className="fas fa-shopping-cart text-primary"
                style={{
                  fontSize: '25px'
                }}></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {qtdeCar}
                <span className="visually-hidden">unread messages</span>
              </span>
            </span>
          </section>
        </div>
      </section>

      <section
        className="d-none d-md-block bg-gray text-uppercase p-1"
        style={{ fontSize: '0.8rem' }}>
        <div className="container-md">
          <div className="row text-center">
            <div className="col">{boasVindas()} visitante</div>
            <div className="col">Meus pedidos</div>
            <div className="col">Rastreio</div>
          </div>
        </div>
      </section>

      <section className="d-none d-md-block bg-white py-2 sticky-top">
        <div className="container-md">
          <div className="row align-items-center justify-content-between">
            <section className="col-2">
              <Link to="/">
                <img src="/logo.png" alt="Logo Desktop" className="img-fluid" />
              </Link>
            </section>
            {['carrinho', 'cadastre-se', 'login'].indexOf(page) === -1 && (
              <section className="col px-md-5 px-0">
                <Search />
              </section>
            )}
            <section className="col-md-auto">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="far fa-user-circle text-primary fa-2x"></i>
                </div>
                <div className="flex-grow-1 ms-3" style={{ lineHeight: '18px' }}>
                  Faça{' '}
                  <Link className="btn-link fw-bold" to="/login">
                    login
                  </Link>{' '}
                  ou <br />
                  crie seu{' '}
                  <Link className="btn-link fw-bold" to="/cadastre-se">
                    Cadastro
                  </Link>
                </div>
              </div>
            </section>
            {['carrinho'].indexOf(page) === -1 && (
              <section className="col-md-auto text-center">
                <span
                  data-bs-toggle="offcanvas"
                  data-bs-target="#carrinhoRight"
                  aria-controls="carrinhoRight"
                  className="text-primary position-relative w-50 text-center m-auto"
                  style={{ cursor: 'pointer' }}>
                  <i className="fas fa-shopping-bag fa-2x"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {qtdeCar}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </span>
                <Link to="/carrinho" className="d-block fw-bold display-h6 btn-link">
                  Meu Carrinho
                </Link>
              </section>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Topo;
