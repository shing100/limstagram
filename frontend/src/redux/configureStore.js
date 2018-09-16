import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { routerReducer, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import users from 'redux/modules/users';
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV;
// 환경이 무엇인지 알려줌
//console(env);

// 히스토리 생헝하기
const history = createHistory();

// 미들웨어 생성하기
const middlewares = [thunk, routerMiddleware(history)];

// developemnet 일때만 추가하기 위한 작업
if(env === "development"){
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const reducer = combineReducers({
    users,
    routing: routerReducer
})

let Store;

if(env === "development") {
    Store = initialState => Reactotron.createStore(reducer, applyMiddleware(...middlewares));
} else {
    // ... array 를 unpack 함
    Store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };

export default Store();
