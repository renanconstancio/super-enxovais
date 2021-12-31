import { Link } from 'react-router-dom';
import { boasVindas } from '../../utils/boasVindas';
import CarrinhoCanvas from '../CarrinhoCanvas';
import IconCar from '../IconCar';
import Search from '../Search';

const Topo = () => {
  return (
    <header>
      <CarrinhoCanvas />
      <section className="container-md d-block d-md-none bg-secondary py-2 fixed-top">
        <div className="row">
          <section className="col">
            <div className="dropdown">
              <span
                className="btn btn-secondary"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fas fa-bars"></i>
              </span>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button className="dropdown-item" type="button">
                    Action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Another action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Something else here
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <section className="col">
            <Link to="/">
              <img src="/logo-mobile.png" alt="Logo Mobile" className="img-fluid" />
            </Link>
          </section>
          <section className="col">1</section>
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
