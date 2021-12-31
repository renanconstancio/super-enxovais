import { Link } from 'react-router-dom';
import './style.scss';

const Mobile = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary fixed-top d-md-none">
      <div className="container">
        <i
          className="fas fa-bars fa-2x p-1 ps-2 pe-2 border border-primary text-primary rounded"
          data-bs-toggle="collapse"
          data-bs-target="#navBarMenuContent"
          aria-controls="navBarMenuContent"
          aria-expanded="false"></i>

        <Link to="/">
          <img src="/logo-mobile.png" alt="Logo Mobile" className="img-fluid" />
        </Link>

        <Link to="/login">
          <i className="fas fa-user fa-2x  p-1 ps-2 pe-2 text-primary"></i>
        </Link>

        <span
          data-bs-toggle="offcanvas"
          data-bs-target="#carrinhoRight"
          aria-controls="carrinhoRight">
          <i className="fas fa-shopping-bag fa-2x  p-1 ps-2 pe-2 text-primary"></i>
        </span>

        <div className="collapse navbar-collapse" id="navBarMenuContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page">
                Home
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Link</span>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <span className="dropdown-item">Action</span>
                </li>
                <li>
                  <span className="dropdown-item">Another action</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <span className="dropdown-item">Something else here</span>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">Disabled</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Mobile };
