import './style.scss';

import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';
import { Helmet } from 'react-helmet';

const Login = () => {
  return (
    <>
      <Topo />
      <section className="bg-white border-top pt-3">
        <div className="container-md">
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col border-end">
              <form className="mb-3 p-0 p-md-5">
                <div className="card bg-secondary rounded-0 border-0">
                  <div className="card-header fw-bold h4">Fazer Login</div>
                  <div className="card-body bg-white">
                    <div className="form-group mt-3 mb-4">
                      <input
                        id="loginEmail"
                        type="email"
                        className="form-control"
                        placeholder="Digite seu e-mail"
                      />
                      <label htmlFor="loginEmail" className="form-control-placeholder">
                        Digite seu e-mail
                      </label>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        id="loginPass"
                        type="password"
                        className="form-control"
                        required
                        placeholder="Digite sua senha"
                      />
                      <label htmlFor="loginPass" className="form-control-placeholder">
                        Digite sua senha
                      </label>
                    </div>
                    <button className="btn btn-dark text-uppercase fw-bold text-white float-end mt-2">
                      <i className="fas fa-sign-in-alt"></i> fazer login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col">
              <form className="mb-3 p-0 p-md-5">
                <div className="card bg-secondary rounded-0 border-0">
                  <div className="card-header fw-bold h4">Cadastre-se</div>
                  <div className="card-body bg-white">
                    <div className="form-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="cadastreSeEmail"
                        placeholder="Digite seu e-mail"
                      />
                      <label htmlFor="cadastreSeEmail" className="form-control-placeholder">
                        Digite seu e-mail
                      </label>
                    </div>
                    <button className="btn btn-dark text-uppercase fw-bold text-white float-end mt-2">
                      <i className="far fa-file-alt"></i> Continuar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Rodape />
      <Helmet>
        <title>Login - {process.env.REACT_APP_TITLE}</title>
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

export default Login;
