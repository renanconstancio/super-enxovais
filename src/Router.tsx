import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './hooks/useCarrinho';
import { ToastProvider } from './hooks/useToasts';

const Home = lazy(() => import('./pages/Home'));
const Produto = lazy(() => import('./pages/Produto'));
const Produtos = lazy(() => import('./pages/Produtos'));

const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
import Loading from './components/Loading';

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CarrinhoProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/:categoria" element={<Produtos />} />
              <Route path="/:categoria/:categoria" element={<Produtos />} />

              <Route path="/:string-:codigo.html" element={<Produto />} />

              <Route path="/carrinho" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </CarrinhoProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default Router;
