import './style.scss';

import { Link, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const {
          data: {
            retorno: { categorias }
          }
        } = await api.get<IBling<ICategorias<ICategoria<TCategoriaProps>>>>(
          `/categorias/json?apikey=${process.env.REACT_APP_API_KEY}`
        );

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
      } catch (error) {
        console.log(error);
      }
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
      <Link to={`/${slugiFy(node.categoria)}`} className="pt-2 pb-2 pe-4 ps-4 menu-item">
        {node.categoria}
        {!!node.children && (
          <div className="sub-menu">
            {node.children.map((v1: TCategoriaProps, i1: number) => (
              <SubCategoriaMenuTree node={v1} key={i1} />
            ))}
          </div>
        )}
      </Link>
    );
  };

  const SubCategoriaMenuTree = ({ node }: any) => {
    return (
      <div className="sub-menu-item">
        {node.categoria}
        {!!node.children && (
          <Link to="/" className="sub-menu">
            {node.children.map((v1: TCategoriaProps, i1: number) => (
              <SubCategoriaMenuTree node={v1} key={i1} />
            ))}
          </Link>
        )}
      </div>
    );
  };

  {
    /* {menus.map((v, i) => (
                  <div className="menu-item pt-2 pb-2 pe-4 ps-4" key={`menu-item_${i}`}>
                    {v.text}
                    {v.data?.length && (
                      <div
                        className="d-flex flex-column justify-content-start p-3 align-self-center sub-menu"
                        key={`sub-menu_${i}${v.id}`}>
                        {v.data.map((v1, i1) => (
                          <div className="sub-menu-item pt-1 pb-1" key={`menu-subitem_${i1}`}>
                            {v1.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))} */
  }

  return (
    <>
      {['carrinho'].indexOf(page) === -1 && (
        <nav className="bg-secondary d-none d-md-block">
          <div className="container">
            <div className="row">
              <section className="d-flex flex-row justify-content-between align-self-center menu">
                {!!menus && menus.map((rws, i) => <CategoriaMenuTree node={rws} key={i} />)}
              </section>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Menu;
