import { useNavigate } from 'react-router-dom';

const MenuCanvas = () => {
  const navigate = useNavigate();

  return (
    <div
      id="menuCanvas"
      className="offcanvas offcanvas-start"
      aria-labelledby="menuCanvasLabel"
      tabIndex={-1}>
      <div className="offcanvas-header bg-secondary text-white">
        <h5 id="menuCanvasLabel" className="mb-0">
          Menu
        </h5>
        <button
          id="close-offcanvas"
          type="button"
          className="btn-close text-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <a className="dropdown-item" href="#">
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
        </ul>
      </div>
    </div>
  );
};

export default MenuCanvas;
