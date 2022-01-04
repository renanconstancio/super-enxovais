import './style.scss';

const Rodape = () => {
  return (
    <footer>
      <div className="container-md">
        <div className="row row-cols-1 row-cols-sm-3 pt-3 pb-5 text-center text-md-start">
          <div className="col">
            <h4>Formar de Pagamento</h4>
            <i className="fab fa-cc-visa fa-2x me-3"></i>
            <i className="fab fa-cc-mastercard fa-2x me-3"></i>
            <i className="fab fa-cc-jcb fa-2x me-3"></i>
            <i className="fab fa-cc-amex fa-2x me-3"></i>
            <i className="fas fa-barcode fa-2x"></i>
          </div>
          <div className="col">
            <h4>Central de Atendimento</h4>
          </div>
          <div className="col">
            <h4>Central de Atendimento</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
