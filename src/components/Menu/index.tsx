import './style.scss';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IBling, ICategoria, ICategorias, TCategoriaProps } from '../../interfaces';
import api from '../../api/api';

const makeTree = (nodes: any, parentId: any) => {
  return nodes
    .filter((node: any) => node.categoria.idCategoriaPai === parentId)
    .reduce(
      (tree: any, node: any) => [
        ...tree,
        {
          ...node,
          children: makeTree(nodes, node.categoria.id)
        }
      ],
      []
    );
};

const Menu = () => {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

  const [menus, setMenus] = useState<TCategoriaProps[]>();

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

        const formattedCategorias = makeTree(categorias, 'id');

        console.log(formattedCategorias);

        setMenus([]);
      } catch (error) {
        console.log(error);
      }
    };

    loadMenus();
  }, []);

  return (
    <>
      {['carrinho'].indexOf(page) === -1 && (
        <nav className="bg-secondary d-none d-md-block">
          <div className="container">
            <div className="row">
              <div className="d-flex flex-row justify-content-between align-self-center menu">
                {/* {menus.map((v, i) => (
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
                ))} */}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Menu;
