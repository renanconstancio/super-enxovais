import './style.scss';

import { useLocation } from 'react-router-dom';
import { TMenusTree } from '../../interfaces';

const Menu = () => {
  const menus: TMenusTree[] = [
    {
      id: 'menu-a',
      text: 'menu AA',
      data: [
        {
          id: 'menu-a',
          text: 'menu a'
        },
        {
          id: 'menu-b',
          text: 'menu b'
        },
        {
          id: 'menu-b',
          text: 'menu b'
        }
      ]
    },
    {
      id: 'menu-b',
      text: 'menu b'
    },
    {
      id: 'menu-d',
      text: 'menu d'
    },
    {
      id: 'menu-c',
      text: 'menu c'
    }
  ] as TMenusTree[];

  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

  return (
    <>
      {['carrinho'].indexOf(page) === -1 && (
        <nav className="bg-secondary d-none d-md-block">
          <div className="container">
            <div className="row">
              <div className="d-flex flex-row justify-content-between align-self-center menu">
                {menus.map((v, i) => (
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
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Menu;
