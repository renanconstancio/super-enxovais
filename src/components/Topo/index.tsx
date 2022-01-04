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
        <div className="row">
          <section className="col-3">
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
          <section className="col-3">
            <span
              id="clickCarrinhoRight"
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoRight"
              aria-controls="carrinhoRight"
              className="text-primary d-flex flex-row align-items-center justify-content-end"
              style={{
                cursor: 'pointer'
              }}>
              <div className="p-1">
                <i className="fas fa-shopping-cart fa-2x"></i>
              </div>
            </span>
          </section>
        </div>
      </section>

      <section className="d-none d-md-block bg-gray py-1">
        <div className="container-md">
          <div className="row text-center">
            <div className="col">{boasVindas()}</div>
            <div className="col">Meus pedidos</div>
            <div className="col">Rastreio</div>
          </div>
        </div>
      </section>

      <section className="d-none d-md-block bg-white py-2">
        <div className="container-md">
          <div className="row align-items-center">
            <div className="col-2">
              <Link to="/">
                <img src="/logo.png" alt="Logo Desktop" className="img-fluid" />
              </Link>
            </div>
            <div className="col">
              <Search />
            </div>
            <div className="col">
              <IconCar />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Topo;
