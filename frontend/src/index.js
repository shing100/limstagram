import React from 'react';
import ReactDOM from 'react-dom';
// 리덕스 추가
import { Provider } from 'react-redux'
import { ConnectedRouter } from "react-router-redux";
import store, { history } from 'redux/configureStore';
import 'index.css';
import App from 'App';

//console.log(store.getState());
store.dispatch({type: "GREATE"})

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            < App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);
