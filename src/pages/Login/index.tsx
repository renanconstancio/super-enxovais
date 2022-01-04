import './style.scss';

import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';

const Login = () => {
  return (
    <>
      <Topo />
      <section className="bg-white border-top pt-3">
        <div className="container-md">
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col">
              <form className="mb-3 p-0 p-md-4">
                <div className="card bg-secondary">
                  <div className="card-header fw-bold">Fazer Login</div>
                  <div className="card-body bg-white">
                    <label htmlFor="loginEmail" className="form-label mb-0">
                      Digite seu e-mail
                    </label>
                    <input
                      type="email"
                      className="form-control mb-0"
                      id="loginEmail"
                      placeholder="nome@seuemail.com"
                    />

                    <label htmlFor="loginPass" className="mt-3 form-label mb-0">
                      Digite sua senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPass"
                      placeholder="nome@seuemail.com"
                    />
                    <button className="btn btn-dark text-uppercase fw-bold text-white float-end mt-2">
                      fazer login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col">
              <form className="mb-3 p-0 p-md-4">
                <div className="card bg-secondary">
                  <div className="card-header fw-bold">Cadastre-se</div>
                  <div className="card-body bg-white">
                    <label htmlFor="cadastreSeEmail" className="form-label mb-0">
                      Digite seu e-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cadastreSeEmail"
                      placeholder="nome@seuemail.com"
                    />
                    <button className="btn btn-dark text-uppercase fw-bold text-white float-end mt-2">
                      Continuar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Rodape />
    </>
  );
};

export default Login;
