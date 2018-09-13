import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import users from 'redux/modules/users';

const env = process.env.NODE_ENV;
// 환경이 무엇인지 알려줌
//console(env);

const middlewares = [thunk];

// developemnet 일때만 추가하기 위한 작업
if(env === "development"){
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const reducer = combineReducers({
    users
})
// ... array 를 unpack 함
let Store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export default Store();
