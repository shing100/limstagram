import { createStore, combineReducers } from "redux";
import users from './modules/users';

const reducer = combineReducers({
    users
})

let Store = initialState => createStore(reducer);

export default Store();
