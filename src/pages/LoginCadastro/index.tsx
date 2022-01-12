import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';

const LoginCadastro = () => {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];

  return (
    <>
      <Topo />

      <div className="pb-5 pt-4 pt-md-5 bg-white border-top">
        <div className="container-md">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1>Cadastre-se</h1>
              <small>* Campos obrigatórios</small>

              <ul className="nav nav-tabs" id="tabCadastro" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link active"
                    id="fisica-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#fisica"
                    role="tab"
                    aria-controls="fisica"
                    aria-selected="true">
                    Pessoa Fisíca
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link"
                    id="juridica-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#juridica"
                    role="tab"
                    aria-controls="juridica"
                    aria-selected="false">
                    Pessoa Jurídica
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="tabCadastroContent">
                <div
                  className="tab-pane fade show active"
                  id="fisica"
                  role="tabpanel"
                  aria-labelledby="fisica-tab">
                  <form
                    action="javascript:void(0)"
                    method="post"
                    className="needs-validation pt-4"
                    noValidate>
                    <div className="form-group input-group-lg mb-4 col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        id="cadastreSeNome"
                        placeholder="..."
                        required
                      />
                      <label htmlFor="cadastreSeNome" className="form-control-placeholder">
                        Nome Completo *
                      </label>
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group input-group-lg mb-4 col-md-7">
                      <input
                        type="email"
                        className="form-control"
                        id="cadastreSeEmail"
                        placeholder="Digite seu e-mail"
                      />
                      <label htmlFor="cadastreSeEmail" className="form-control-placeholder">
                        Digite seu e-mail *
                      </label>
                    </div>
                    <div className="form-group input-group-lg mb-4 col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        id="cadastreSeCpf"
                        placeholder="..."
                      />
                      <label htmlFor="cadastreSeCpf" className="form-control-placeholder">
                        CPF *
                      </label>
                    </div>
                    <div className="form-group input-group-lg mb-4 col-md-5">
                      <input
                        type="tel"
                        className="form-control"
                        id="cadastreSeFone"
                        placeholder="..."
                      />
                      <label htmlFor="cadastreSeFone" className="form-control-placeholder">
                        Telefone/Celular *
                      </label>
                    </div>
                    <div className="form-group input-group-lg mb-4 col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        id="cadastreSeSenha"
                        placeholder="..."
                      />
                      <label htmlFor="cadastreSeSenha" className="form-control-placeholder">
                        Digite uma senha *
                      </label>
                    </div>
                    <div className="form-group input-group-lg mb-4 col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        id="cadastreSeSenhaConfirma"
                        placeholder="..."
                      />
                      <label htmlFor="cadastreSeSenhaConfirma" className="form-control-placeholder">
                        Confirme a senha *
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary text-uppercase fw-bold">
                      cadastro
                    </button>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="juridica"
                  role="tabpanel"
                  aria-labelledby="juridica-tab">
                  Cadastro Juridica
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Rodape />
      <Helmet>
        <title>Cadastre-se | {process.env.REACT_APP_TITLE}</title>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        <meta name="description" content="index,follow" />
        <meta name="keywords" content="index,follow" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
    </>
  );
};

export default LoginCadastro;
