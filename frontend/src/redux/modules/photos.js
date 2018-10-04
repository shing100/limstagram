// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_FEED = "SET_FEED";

// action creators

const setFeed = (feed) => {
    return {
        type: SET_FEED,
        feed
    }
}

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
        .then(json => dispatch(setFeed(json)))
        .catch(err => console.log(err))
    }
}

// intiial state

const intialState = {}

// reducer

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        default:
            return state;
    }
}

// reducer functions

const applySetFeed = (state, action) => {
    const { feed }  = action;
    return {
        ...state,
        feed
    }

}

// exports

const actionCreators = {
    getFeed
}

export { actionCreators }

// reducer export

export default reducer;
