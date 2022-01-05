import './style.scss';

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
    <span
      // eslint-disable-next-line no-unused-vars
      ref={(_e) => ref}
      id="clickCarrinhoRight"
      data-bs-toggle="offcanvas"
      data-bs-target="#carrinhoRight"
      aria-controls="carrinhoRight"
      className="d-flex align-items-center justify-content-end text-primary"
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
    </span>
  );
};

export default IconCar;
