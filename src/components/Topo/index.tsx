import { Link } from 'react-router-dom';
import { boasVindas } from '../../utils/boasVindas';
import CarrinhoCanvas from '../CarrinhoCanvas';
import IconCar from '../IconCar';
import MenuCanvas from '../MenuCanvas';
import Search from '../Search';

const Topo = () => {
  return (
    <header>
      <MenuCanvas />
      <CarrinhoCanvas />
      <section className="container-md d-block d-md-none bg-secondary py-2 fixed-top">
        <div className="row justify-content-between align-items-center">
          <section className="col-2">
            <div className="dropdown">
              <span
                className="btn btn-dark"
                id="clickMenuCanvas"
                data-bs-toggle="offcanvas"
                data-bs-target="#menuCanvas"
                aria-controls="menuCanvas">
                <i className="fas fa-bars"></i>
              </span>
            </div>
          </section>
          <section className="col-6 text-center">
            <Link to="/">
              <img src="/logo-mobile.png" alt="Logo Mobile" className="img-fluid" />
            </Link>
          </section>
          <section className="col-4 align-middle">
            <span className="btn btn-sm">
              <i className="fas fa-search text-primary" style={{ fontSize: '20px' }}></i>
            </span>
            <span
              className="btn btn-sm"
              id="clickCarrinhoRight"
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoRight"
              aria-controls="carrinhoRight">
              <i
                className="fas fa-shopping-cart text-primary"
                style={{
                  fontSize: '20px'
                }}></i>
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

      <section className="d-none d-md-block bg-white py-2">
        <div className="container-md">
          <div className="row align-items-center justify-content-between">
            <section className="col-2">
              <Link to="/">
                <img src="/logo.png" alt="Logo Desktop" className="img-fluid" />
              </Link>
            </section>
            <section className="col px-md-5 px-0">
              <Search />
            </section>
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
                  <Link className="btn-link fw-bold" to="/login">
                    Cadastro
                  </Link>
                </div>
              </div>
            </section>
            <section className="col-md-auto">
              <IconCar />
            </section>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Topo;
