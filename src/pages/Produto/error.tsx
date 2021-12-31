import { Link } from 'react-router-dom';

const ProdutoError = () => {
  return (
    <div className="bg-white pt-5 pb-5 text-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-md-5">
            <i className="far fa-frown fa-10x"></i>
            <h1>Produto indisponível</h1>
            <p className="mt-3 mb-5 h5">
              Descuple, mas esse produto não está mais disponível ou não foi encontrado em nosso
              sistema, clique no link abaixo para continuar navegando.
            </p>
            <Link to="/">
              <span className="text-uppercase btn btn-link">voltar para o site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoError;
