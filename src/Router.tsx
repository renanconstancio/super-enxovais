import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './hooks/useCarrinho';
import { ToastProvider } from './hooks/useToasts';

import Home from './pages/Home';
import Produto from './pages/Produto';

import Cart from './pages/Cart';
import Login from './pages/Login';

// import Home from './pages/Home';
// import Produto from './pages/Produto';
// import Produtos from './pages/Produtos';

/* 
<Route path="/logout" component={LogOut} exact />
<Route path="/login" component={LogIn} exact />
<Route path="/relatorios" component={Dashboard} exact />

<Route path="/produtos" component={ListProdutos} exact />
<Route
  component={EditProdutos}
  path={["/produtos/edit/:id", "/produtos/new"]}
  exact
/>

<Route path="/marcas" component={ListMarcas} exact />
<Route
  component={EditMarcas}
  path={["/marcas/edit/:id", "/marcas/new"]}
  exact
/> 
*/

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CarrinhoProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/produtos" element={<Produtos />} />*/}
            <Route path="/:string/:codigo/p" element={<Produto />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </CarrinhoProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default Router;
