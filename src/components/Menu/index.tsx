import './style.scss';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { ICategoria, TCategoriaProps } from '../../interfaces';
import { slugiFy } from '../../utils/slugiFy';
import { getTree } from '../../utils/getTree';

const Menu = ({ resource }: any) => {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

  let key = 1;

  const CategoriaMenuTree = ({ node }: any) => {
    return (
      <li className="pt-2 pb-2 pe-4 ps-4 menu-item" key={`a${key++}`}>
        <NavLink to={`/${slugiFy(node.descricao)}`}>{node.descricao}</NavLink>
        {!!node.children && (
          <div className="sub-menu">
            {node.children.map((v1: TCategoriaProps, i1: number) => (
              <SubCategoriaMenuTree node={v1} key={i1} />
            ))}
          </div>
        )}
      </li>
    );
  };

  const SubCategoriaMenuTree = ({ node }: any) => {
    return (
      <div className="sub-menu-item" key={`ab${key++}`}>
        {node.descricao}
        {!!node.children && (
          <Link to="/" className="sub-menu" key={`abc${key++}`}>
            {node.children.map((v1: TCategoriaProps, i1: number) => (
              <SubCategoriaMenuTree node={v1} key={i1} />
            ))}
          </Link>
        )}
      </div>
    );
  };

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

  return (
    <>
      <nav className="bg-secondary d-none d-md-block">
        <div className="container">
          <div className="row">
            <ul className="menu d-flex flex-row justify-content-between align-self-center">
              {!!formattedCategorias &&
                formattedCategorias.map((rws: any, i: any) => (
                  <CategoriaMenuTree node={rws} key={i} />
                ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* {['carrinho'].indexOf(page) === -1 && (
      )} */}
    </>
  );
};

export default Menu;
