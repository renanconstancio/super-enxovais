import './style.scss';

import { Link } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';
import { formatPrice } from '../../utils/formart';

const IconCar = (_props: any, ref: any) => {
  const { carrinho } = useCarrinho();

  const qtdeCar = carrinho?.reduce((sumQtde, product) => {
    return (sumQtde += product.qtde);
  }, 0);

  const precoCar = formatPrice(
    carrinho?.reduce((sumPreco, product) => {
      return (sumPreco += product.qtde * product.preco);
    }, 0)
  );

  return (
    <>
      <div
        ref={() => ref}
        data-bs-toggle="offcanvas"
        data-bs-target="#carrinhoRight"
        aria-controls="carrinhoRight"
        className="text-primary position-relative w-50 text-center m-auto"
        style={{ cursor: 'pointer' }}>
        <i className="fas fa-shopping-bag fa-2x"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {qtdeCar}
          <span className="visually-hidden">unread messages</span>
        </span>
      </div>
      <Link to="/carrinho" className="d-block fw-bold display-h6 btn-link">
        Meu Carrinho
      </Link>
      {/* <div
        ref={() => ref}
        data-bs-toggle="offcanvas"
        data-bs-target="#carrinhoRight"
        aria-controls="carrinhoRight"
        className="text-primary "
        style={{
          cursor: 'pointer'
        }}>
        <div className="flex-shrink-0">
          <i className="fas fa-shopping-bag fa-2x"></i>
        </div>
        <div className="flex-grow-1 ms-3" style={{ lineHeight: '18px' }}>
          <strong className="text-uppercase d-block">meu carrinho</strong>
          <small>
            {qtdeCar} item | {precoCar}
          </small>
        </div>
      </div> */}
    </>
  );
};

export default IconCar;
