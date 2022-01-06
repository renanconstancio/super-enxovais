/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { IImagem } from '../../interfaces';
import { slugiFy } from '../../utils/slugiFy';

type CardTypes = {
  id: number;
  descricao: string;
  precoDe?: string | undefined;
  precoPor: string;
  codigo?: string;
  imagens?: IImagem[];
  itens?: any;
  addItemClick(args0?: string | number): void;
};

const Card = ({
  id,
  descricao,
  precoDe,
  precoPor,
  imagens,
  codigo,
  itens,
  addItemClick
}: CardTypes) => {
  const addEvent = (ethis: any, e: any) => {
    addItemClick(ethis);
    e.preventDefault();
  };

  const formattedImage = imagens?.filter((_a, i) => i === 0);

  return (
    <Link className="col" to={`/${slugiFy(descricao)}-${codigo}.html`}>
      <div className="card shadow-md mb-3 rounded-0">
        {formattedImage?.length && (
          <img
            src={`${formattedImage[0].link}`}
            className="card-img-top"
            alt={formattedImage[0].link}
          />
        )}

        <div className="card-body">
          <strong className="card-title">{descricao}</strong>
          <p className="card-text">
            {precoDe && <s className="d-block">DE R$: {precoDe}</s>}
            <strong className="text-danger fs-5">POR {precoPor}</strong>
          </p>
        </div>

        {codigo && (
          <div
            onClick={(e) => addEvent(this, e)}
            className="fw-bold m-1 bg-primary bg-opacity-75 text-white rounded d-flex justify-content"
            style={{
              cursor: 'pointer'
            }}>
            <span className="bg-primary p-2 rounded-start">
              <i className="fas fa-cart-plus"></i> {itens[id] ? itens[id] : 0}
            </span>

            <span className="p-2">
              ADICIONAR <span className="d-none d-sm-inline">AO CARRINHO</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
