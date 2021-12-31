import { useLocation } from 'react-router-dom';
import { TMenusTree } from '../../interfaces';

import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

const Menu = () => {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

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

  return (
    <>
      {['carrinho'].indexOf(page) === -1 && <Desktop menus={menus} />}
      <Mobile />
    </>
  );
};

export default Menu;
