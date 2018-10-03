// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions

// action creators

// API actions

const getFeed = () => {
    return (dispatch, getState) => {
        const  { user : { token } } = getState();
        fetch("/images/", {
            headers: {
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }
}

// intiial state

const intialState = {

}

// reducer

const reducer = (state = intialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

// reducer functions

// exports

const actionCreators = {
    getFeed
}

export { actionCreators }

// reducer export

export default reducer;
