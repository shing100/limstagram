import React from 'react';
import ReactDOM from 'react-dom';
// 리덕스 추가
import { Provider } from 'react-redux'
import store from 'redux/configureStore';
import 'index.css';
import App from 'App';

//console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        < App />
    </Provider>
    , document.getElementById('root')
);
