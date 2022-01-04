import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';
import { ICarrinho } from '../../interfaces';
import { formatPrice } from '../../utils/formart';

const CarrinhoCanvas = () => {
  const navigate = useNavigate();

  const { carrinho, removeItem } = useCarrinho();

  const cartFormatted = carrinho.map((product: ICarrinho) => ({
    id: product.id,
    descricao: product.descricao,
    preco: product.preco,
    qtde: product.qtde,
    image: product.image,
    variacao: product.variacao,
    precoFormatted: formatPrice(product.preco),
    precoTotal: formatPrice(product.preco * product.qtde)
  }));

  const deleteItemCart = (id: number) => {
    removeItem(id);
  };

  const totalCarrinho = formatPrice(
    carrinho.reduce((sumTotal, product) => {
      return (sumTotal += product.qtde * product.preco);
    }, 0)
  );

  const verCarrinho = () => {
    const btn = document.getElementById('close-offcanvas');
    if (btn) btn.click();

    navigate('/carrinho');
  };

  return (
    <div
      id="carrinhoRight"
      className="offcanvas offcanvas-end"
      aria-labelledby="carrinhoRightLabel"
      data-bs-scroll="true"
      tabIndex={-1}>
      <div className="offcanvas-header bg-secondary text-white">
        <h5 id="carrinhoRightLabel" className="mb-0">
          Detalhes da Compra
        </h5>
        <button
          id="close-offcanvas"
          type="button"
          className="btn-close text-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {cartFormatted.length === 0 && (
          <h5 className="text-center">
            <i className="far fa-frown fa-5x mb-3 d-block"></i>
            Seu carrinho de compras parece estar vazio?
          </h5>
        )}

        {cartFormatted.length > 0 && (
          <>
            {cartFormatted.map((rws) => (
              <div className="card mb-1" key={rws.id}>
                <div className="row g-0">
                  <div className="col-md-3">
                    <img src="/imgs/teste.jpg" className="card-img-top" alt="..." />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h6 className="card-title">{rws.descricao}</h6>
                      <p className="card-text fw-bold">
                        {rws.qtde <= 1 ? `Item ${rws.qtde}` : `Itens ${rws.qtde}`}{' '}
                        <span className="fw-bold text-danger">{rws.precoTotal}</span>
                        <i
                          style={{ cursor: 'pointer' }}
                          className="fas fa-trash position-absolute top-0 end-0 me-2 mt-2"
                          onClick={() => deleteItemCart(rws.id)}></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-grid gap-2">
              <strong className="text-muted fs-6 text-end">Frete R$: 0,00</strong>
              <strong className="text-muted fs-6 text-end">Cupom R$: 0,00</strong>
              <strong className="text-danger fs-3 text-end">Total {totalCarrinho}</strong>
              <button
                className="btn btn-outline-primary btn-lg text-uppercase fw-bold"
                type="button">
                <i className="fas fa-credit-card"></i> finalizar compra
              </button>
              <button
                className="btn btn-outline-secondary btn-lg text-uppercase fw-bold"
                type="button"
                onClick={verCarrinho}>
                <i className="fas fa-shopping-cart"></i> ver carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarrinhoCanvas;
