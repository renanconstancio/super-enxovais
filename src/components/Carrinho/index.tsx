import { Link } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';
import { ICarrinho } from '../../interfaces';
import { formatPrice } from '../../utils/formart';

const Carrinho = () => {
  const { carrinho, removeItem, updateItem } = useCarrinho();

  const cartFormatted = carrinho.map((product: ICarrinho) => ({
    id: product.id,
    descricao: product.descricao,
    codigo: product.codigo,
    preco: product.preco,
    qtde: product.qtde,
    image: product.image,
    variacao: product.variacao,
    precoFormatted: formatPrice(product.preco),
    precoTotal: formatPrice(product.preco * product.qtde)
  }));

  const handleUPItemCart = (product: ICarrinho) => {
    updateItem({
      id: product.id,
      codigo: `${product.codigo}`,
      qtde: product.qtde + 1
    });
  };

  const handleDOWNItemCart = (product: ICarrinho) => {
    updateItem({
      id: product.id,
      codigo: `${product.codigo}`,
      qtde: product.qtde - 1
    });
  };

  const deleteItemCart = (id: number) => {
    removeItem(id);
  };

  const totalCarrinho = formatPrice(
    carrinho.reduce((sumTotal, product) => {
      return (sumTotal += product.qtde * product.preco);
    }, 0)
  );

  const totalQtde = carrinho.reduce((sumQtde, product) => {
    return (sumQtde += product.qtde);
  }, 0);

  return (
    <section className="bg-white pt-3 pt-md-5 border-top">
      {totalQtde === 0 && (
        <div className="container-md">
          <div className="row w-100 align-items-center">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 className="text-center">
                <i className="far fa-frown fa-5x mb-3 d-block"></i>
                Seu carrinho de compras parece estar vazio?
              </h5>
            </div>
          </div>
        </div>
      )}

      {totalQtde > 0 && (
        <div className="container-md">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <h3 className="display-5 mb-2">Meu Carrinho</h3>
              <table
                id="shoppingCart"
                className="table table-condensed table-responsive align-middle">
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      Produto
                    </th>
                    <th>Preço</th>
                    <th className="text-center" colSpan={1}>
                      Qtde
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartFormatted.map((rws) => (
                    <tr key={rws.id}>
                      <td data-th="Product" style={{ whiteSpace: 'nowrap' }} width={`1%`}>
                        <img
                          src="https://via.placeholder.com/90x90/5fa9f8/ffffff"
                          className="d-none d-md-block rounded mb-2 shadow"
                          alt=""
                        />
                      </td>
                      <td data-th="Product">
                        <h6>{rws.descricao}</h6>
                        {/* <p className="font-weight-light">Brand &amp; Name</p> */}
                      </td>
                      <td data-th="Price" style={{ whiteSpace: 'nowrap' }} width={`1%`}>
                        <span className="text-danger fw-bold">{rws.precoTotal}</span>
                      </td>
                      <td data-th="Quantity" style={{ whiteSpace: 'nowrap' }} width={`135px`}>
                        <div className="input-group">
                          <span
                            className="btn btn-outline-default"
                            onClick={() => handleDOWNItemCart(rws)}>
                            <i className="fas fa-minus"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={rws.qtde}
                          />
                          <span
                            className="btn btn-outline-default"
                            onClick={() => handleUPItemCart(rws)}>
                            <i className="fas fa-plus"></i>
                          </span>
                        </div>
                      </td>
                      <td
                        className="actions text-end"
                        style={{ whiteSpace: 'nowrap' }}
                        width={`1%`}>
                        <i
                          className="fas fa-trash text-danger"
                          onClick={() => deleteItemCart(rws.id)}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="float-right text-end text-danger">
                <h4>Subtotal:</h4>
                <h1>{totalCarrinho}</h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mt-4 pb-5 align-items-center">
            <div className="col-12 col-md-3 mb-1 text-start">
              <Link to="/" className="btn btn-link btn-lg d-block text-uppercase mb-1">
                <i className="fas fa-arrow-left me-2"></i> Continuar comprando
              </Link>
            </div>

            <div className="col-12 col-md-3 mb-1 text-end">
              <a href="catalog.html" className="btn btn-success btn-lg d-block text-uppercase mb-1">
                Finalizar Compra <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carrinho;
