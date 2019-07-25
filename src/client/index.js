import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './containers/app'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './scss/index.scss';

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('app'));
/*
console.log(module.hot , '++++++');
if(module.hot) {
    module.hot.accept('./scss/index.scss', function() {
    console.log(module.hot , '++++++-----1111');
})
}
*/