/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import './style.scss';

import { forwardRef } from 'react';
import { useCarrinho } from '../../hooks/useCarrinho';
import { formatPrice } from '../../utils/formart';

const IconCar = forwardRef((_props, ref) => {
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
      ref={(_e) => ref}
      id="clickCarrinhoRight"
      data-bs-toggle="offcanvas"
      data-bs-target="#carrinhoRight"
      aria-controls="carrinhoRight"
      className="d-flex flex-row align-items-center justify-content-end"
      style={{
        cursor: 'pointer'
      }}>
      <div className="p-1">
        <i className="fas fa-shopping-bag fa-3x"></i>
      </div>
      <div className="p-1 d-flex flex-column">
        <strong className="text-uppercase">meu carrinho</strong>
        <small className="">
          {qtdeCar} item | {precoCar}
        </small>
      </div>
    </span>
  );
});

export default IconCar;
