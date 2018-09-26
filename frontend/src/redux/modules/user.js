// imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";

// action creators

const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        token
    }
}

// API actions

const facebookLogin = (access_token) => {
    return (dispatch) => {
        fetch("/users/login/facebook/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err))
    }
}

const usernameLogin = (username, password) => {
    return (dispatch) => {
        fetch("/rest-auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token) {
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err))
    }
}

// intiial state

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false
}

// reducer

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_TOKEN:
            return applySetToken(state, action);
        default:
            return state;
    }
}

// reducer functions

const applySetToken = (state, action) => {
    const { token } = action;
    localStorage.setItem("jwt", token);
    return {
        ...state,
        isLoggedIn:true,
        token
    }
}

// exports

const actionCreators = {
    facebookLogin,
    usernameLogin
}

export { actionCreators };

// reducer export

export default reducer;
