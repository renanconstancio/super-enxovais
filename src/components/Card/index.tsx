import { Link } from 'react-router-dom';
import { IImagem } from '../../interfaces';
import { slugiFy } from '../../utils/slugiFy';

type CardTypes = {
  id: number;
  descricao: string;
  precoDe?: string | undefined;
  precoPor: string;
  codigo?: string;
  itens?: any[];
  imagens?: IImagem[];
};

const Card = ({ id, descricao, precoDe, precoPor, imagens, codigo }: CardTypes) => {
  // const addEvent = (ethis: any, e: any) => {
  //   addItemClick(ethis);
  //   e.preventDefault();
  // };

  const formattedImage = imagens?.filter((_a, i) => i === 0);

  return (
    <Link className="card p-3 shadow-md mb-3 rounded-0" to={`${slugiFy(descricao)}/${codigo}/p`}>
      {formattedImage?.length && (
        <img
          src={`${formattedImage[0].link}`}
          className="card-img-top"
          alt={formattedImage[0].link}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{descricao}</h5>
        <p className="card-text">
          {precoDe && <s className="d-block fs-6">DE R$: {precoDe}</s>}
          <strong className="text-danger fs-5">POR {precoPor}</strong>
        </p>
      </div>

      {/* {codigo && (
        <div
          onClick={(e) => addEvent(this, e)}
          className="fw-bold mb-3 bg-primary bg-opacity-75 text-white rounded d-flex justify-content"
          style={{
            cursor: 'pointer'
          }}>
          <span className="bg-primary p-2 rounded-start">
            <i className="fas fa-cart-plus"></i> {itens[id] ? itens[id] : 0}
          </span>

          <span className="p-2">ADICIONAR AO CARRINHO</span>
        </div>
      )} */}
    </Link>
  );
};

export default Card;