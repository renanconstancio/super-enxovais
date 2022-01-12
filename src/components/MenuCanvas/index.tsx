import { NavLink } from 'react-router-dom';
import { ICategoria, TCategoriaProps } from '../../interfaces';
import { getTree } from '../../utils/getTree';
import { slugiFy } from '../../utils/slugiFy';

const MenuCanvas = ({ resource }: any) => {
  let key = 1;

  const categorias = resource.menus.read();

  const categoriasReduce = categorias.reduce(
    (tree: any, node: ICategoria<TCategoriaProps>) => [
      ...tree,
      {
        id: node.categoria.id,
        descricao: node.categoria.descricao,
        idCategoriaPai: node.categoria.idCategoriaPai
      }
    ],
    []
  );

  const formattedCategorias = getTree(categoriasReduce, 'idCategoriaPai')[0].children;

  const CategoriaMenuTree = ({ node }: any) => {
    return (
      <li className="nav-item dropdown" key={`${key++}`}>
        <NavLink to={`/${slugiFy(node.descricao)}`} className="nav-link float-start">
          {node.descricao}
        </NavLink>

        {!!node.children && (
          <>
            <i
              className="dropdown-toggle float-end fas fa-plus"
              data-bs-toggle="dropdown"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                paddingRight: '0.3rem',
                paddingLeft: '0.3rem',
                lineHeight: '250%',
                fontSize: '100%',
                cursor: 'pointer'
              }}></i>
            <ul className="dropdown-menu w-100" key={`ab${key++}`}>
              {node.children.map((v1: TCategoriaProps, i1: number) => (
                <SubCategoriaMenuTree node={v1} key={i1} parent={node.descricao} />
              ))}
            </ul>
          </>
        )}
      </li>
    );
  };

  const SubCategoriaMenuTree = ({ node, parent }: { node: any; parent: string }) => {
    return (
      <li>
        <NavLink className="dropdown-item" to={`/${slugiFy(parent)}/${slugiFy(node.descricao)}`}>
          {node.descricao}
        </NavLink>
      </li>
    );
  };

  return (
    <section
      id="menuCanvas"
      className="offcanvas offcanvas-start"
      aria-labelledby="menuCanvasLabel"
      data-bs-scroll="true"
      tabIndex={-1}>
      <div className="offcanvas-header bg-secondary text-white">
        <h5 id="menuCanvasLabel" className="mb-0">
          Menus
        </h5>
        <button
          type="button"
          className="btn-close text-white"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuCanvas"
          aria-controls="menuCanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          {!!formattedCategorias &&
            formattedCategorias.map((rws: any, i: number) => (
              <CategoriaMenuTree node={rws} key={i} />
            ))}

          {/* <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Active
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
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
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              NavLink
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li> */}
        </ul>
      </div>
    </section>
  );
};

export default MenuCanvas;
