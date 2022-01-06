// import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import { boasVindas } from '../../utils/boasVindas';

const MenuCanvas = () => {
  // const navigate = useNavigate();

  return (
    <section
      id="menuCanvas"
      className="offcanvas offcanvas-start"
      aria-labelledby="menuCanvasLabel"
      data-bs-scroll="true"
      tabIndex={-1}>
      <div className="offcanvas-header bg-secondary text-white">
        <h5 id="menuCanvasLabel" className="mb-0">
          {boasVindas()} Visitante
        </h5>
        <button
          id="close-offcanvas"
          type="button"
          className="btn-close text-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="list-group list-group-flush">
          <span className="list-group-item">
            <i className="fas fa-list"></i> Menus/Categorias
          </span>

          <NavLink to="/" className="list-group-item">
            <i className="fas fa-home"></i> Inicio
          </NavLink>
          <NavLink to="/login" className="list-group-item">
            <i className="fas fa-sign-in-alt"></i> Login
          </NavLink>
          <NavLink to="/rastreio" className="list-group-item">
            <i className="fas fa-gifts"></i> Rastreie seu Pedido
          </NavLink>
        </div>
        {/* 
        <ul className="list-group list-group-flush">
          <li className="list-group-item active" aria-current="true">
            An active item
          </li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth one</li>
        </ul> */}

        {/* <a className="dropdown-item" href="#">
          Login
        </a>
        <span
          className="btn btn-secondary"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <i className="fas fa-bars"></i>
        </span>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul> */}
      </div>
    </section>
  );
};

export default MenuCanvas;
