import './style.scss';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../api/api';
import { IBling, ICategoria, ICategorias, TCategoriaProps } from '../../interfaces';
import { slugiFy } from '../../utils/slugiFy';

type TGetTree = {
  id: string;
  categoria: string;
  idCategoriaPai: string;
  children?: TGetTree[];
};

const Menu = () => {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

  const [menus, setMenus] = useState<TGetTree[]>();

  let key = 1;

  useEffect(() => {
    const loadMenus = async () => {
      const categorias = await api
        .get<IBling<ICategorias<ICategoria<TCategoriaProps>>>>(
          `/categorias/json&apikey=${process.env.REACT_APP_API_KEY}`
        )
        .then((resp) => {
          if (resp.data.retorno.erros == undefined) {
            return resp.data.retorno.categorias;
          } else {
            throw resp.data.retorno.erros[0].erro.msg;
          }
        })
        .catch((erro) => {
          console.error('Erro no método loadMenus() da classe BlingAPI: ');
          console.error(erro);
          throw erro.toString();
        });

      const categoriasReduce = categorias.reduce(
        (tree: any, node: any) => [
          ...tree,
          {
            id: node.categoria.id,
            categoria: node.categoria.descricao,
            idCategoriaPai: node.categoria.idCategoriaPai
          }
        ],
        []
      );
      const formattedCategorias = getTree(categoriasReduce, 'idCategoriaPai');
      setMenus(formattedCategorias[0].children);
    };

    loadMenus();
  }, []);

  const getTree = (arr: any, p = 'parent_id') =>
    arr.reduce((o: any, n: any) => {
      if (!o[n.id]) o[n.id] = {};
      if (!o[n[p]]) o[n[p]] = {};
      if (!o[n[p]].children) o[n[p]].children = [];
      if (o[n.id].children) n.children = o[n.id].children;
      o[n[p]].children.push(n);
      o[n.id] = n;
      return o;
    }, {} as TCategoriaProps);

  const CategoriaMenuTree = ({ node }: any) => {
    return (
      <li className="pt-2 pb-2 pe-4 ps-4 menu-item" key={`a${key++}`}>
        <NavLink to={`/${slugiFy(node.categoria)}`}>{node.categoria}</NavLink>
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
        {node.categoria}
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

  return (
    <>
      {['carrinho'].indexOf(page) === -1 && (
        <nav className="bg-secondary d-none d-md-block">
          <div className="container">
            <div className="row">
              {!menus && <div className="placeholder" style={{ height: '40px' }}></div>}

              {!!menus && (
                <ul className="menu d-flex flex-row justify-content-between align-self-center">
                  {menus.map((rws, i) => (
                    <CategoriaMenuTree node={rws} key={i} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Menu;
