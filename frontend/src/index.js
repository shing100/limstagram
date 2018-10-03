import React from 'react';
import ReactDOM from 'react-dom';
// 리덕스 추가
import { Provider } from 'react-redux'
import { ConnectedRouter } from "react-router-redux";
import store, { history } from 'redux/configureStore';
import App from "components/App";
import I18n from "redux-i18n";
import {translations} from "translations";

//import "ReactotronConfig";

//console.log(store.getState());
//store.dispatch({type: "GREATE"})

ReactDOM.render(
    <Provider store={store}>
        <I18n translations={translations} initialLang="ko" fallbackLang="ko">
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </I18n>
    </Provider>
    , document.getElementById('root')
);
