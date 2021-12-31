import { Helmet } from 'react-helmet';
import Carrinho from '../../components/Carrinho';
import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';

import './style.scss';

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Meu Carrinho de Compras</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Topo />

      <Carrinho />

      <Rodape />
    </>
  );
};

export default Cart;
