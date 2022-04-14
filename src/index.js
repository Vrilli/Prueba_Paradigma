import React from 'react';
import ReactDOM from 'react-dom';
import AppRouters from './router/AppRouters';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import "./styles/App.css"



ReactDOM.render(
  <Provider store={store}>
    <AppRouters />
  </Provider>,
  document.getElementById('root')
);

