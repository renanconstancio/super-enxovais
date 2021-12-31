import './style.scss';

const InfoPgtos = () => {
  return (
    <section className="info-pgtos">
      <div className="container pt-2 pb-2">
        <div className="row row-cols-xs-2 col-cols-sm-4">
          <div className="col">
            <div className="d-flex align-items-center">
              <i className="fas fa-credit-card fa-3x pe-2"></i>
              <span>Tudo em 12x sem juros</span>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center">
              <i className="fas fa-truck fa-3x pe-2"></i>
              <span>Frete Grátis</span>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center">
              <i className="fas fa-barcode fa-3x pe-2"></i>
              <span>Tudo em 12x sem juros</span>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center">
              <i className="fas fa-credit-card fa-3x pe-2"></i>
              <span>Tudo em 12x sem juros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPgtos;
