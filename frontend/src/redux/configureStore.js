import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import users from 'redux/modules/users';

const middlewares = [thunk];

const reducer = combineReducers({
    users
})
// ... array 를 unpack 함
let Store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export default Store();
