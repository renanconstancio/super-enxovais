import './style.scss';

import Rodape from '../../components/Rodape';
import Topo from '../../components/Topo';
import { Helmet } from 'react-helmet';
import { useRef, useState } from 'react';

const Login = () => {
  const initialFormData = {
    email: '',
    password: ''
  };

  const [formData, updateFormData] = useState(initialFormData);

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    document.getElementsByName('email')[0].classList.remove('is-invalid');
    document.getElementsByName('password')[0].classList.remove('is-invalid');

    if (formData.email === '' || formData.password === '') {
      if (formData.email === '') document.getElementsByName('email')[0].classList.add('is-invalid');
      if (formData.password === '')
        document.getElementsByName('password')[0].classList.add('is-invalid');
      return;
    }
  };

  const handleChange = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Topo />
      <section className="bg-white border-top pt-3">
        <div className="container-md">
          <div className="row row-cols-1 row-cols-md-2 justify-content-center">
            <div className="col">
              <form className="mb-3 p-0 p-md-5" ref={form} id="formLogin">
                <div className="card bg-secondary rounded-0 border-0">
                  <div className="card-header fw-bold h4 text-white">Fazer Login</div>
                  <div className="card-body bg-white">
                    <div className="form-group mt-3 mb-4">
                      <input
                        id="loginEmail"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="."
                        aria-describedby="emailHelp validationEmailFeedback"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="loginEmail" className="form-control-placeholder">
                        Digite seu e-mail
                      </label>
                      <small id="validationEmailFeedback" className="invalid-feedback">
                        Campo obrigatório
                      </small>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        id="loginPass"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="."
                        aria-describedby="passHelp validationPassFeedback"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="loginPass" className="form-control-placeholder">
                        Digite sua senha
                      </label>
                      <small id="validationPassFeedback" className="invalid-feedback">
                        Campo obrigatório
                      </small>
                    </div>
                    <button
                      className="btn btn-dark text-uppercase fw-bold text-white float-end mt-2"
                      onClick={handleSubmit}>
                      <i className="fas fa-sign-in-alt"></i> fazer login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="col">
              <form className="mb-3 p-0 p-md-5">
                <div className="card bg-secondary rounded-0 border-0">
                  <div className="card-header fw-bold h4 text-white">Cadastre-se</div>
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
            </div> */}
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
