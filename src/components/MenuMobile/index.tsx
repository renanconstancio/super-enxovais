import { NavLink } from 'react-router-dom';
import { boasVindas } from '../../utils/boasVindas';

const MenuMobile = () => {
  return (
    <section
      id="menuMobile"
      className="offcanvas offcanvas-start"
      aria-labelledby="menuMobileLabel"
      data-bs-scroll="true"
      tabIndex={-1}>
      <div className="offcanvas-header bg-secondary text-white">
        <h5 id="menuMobileLabel" className="mb-0">
          {boasVindas()} Visitante
        </h5>
        <button
          id="close-offcanvas"
          type="button"
          className="btn-close text-white"
          data-bs-dismiss="offcanvas"
          data-bs-target="#menuMobile"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="list-group list-group-flush">
          <span
            className="list-group-item"
            id="clickMenuCanvas"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuCanvas"
            aria-controls="menuCanvas"
            style={{ cursor: 'pointer' }}>
            <i className="fas fa-list"></i> Menus/Categorias
          </span>

          <NavLink to="/" className="list-group-item">
            <i className="fas fa-home"></i> Inicio
          </NavLink>
          <NavLink to="/login" className="list-group-item">
            <i className="fas fa-sign-in-alt"></i> Login
          </NavLink>
          <NavLink to="/cadastre-se" className="list-group-item">
            <i className="fas fa-user-alt"></i> Cadastre-se
          </NavLink>
          <NavLink to="/rastreio" className="list-group-item">
            <i className="fas fa-gifts"></i> Rastreie seu Pedido
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default MenuMobile;
