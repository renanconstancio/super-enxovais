import './styles/_custom.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

// import 'bootstrap/js/dist/offcanvas';
// import 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/modal';

import ReactDOM from 'react-dom';

import Router from './Router';

import reportWebVitals from './reportWebVitals';

const element = document.getElementById('root');
ReactDOM.render(<Router />, element);

// ReactDOM.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
