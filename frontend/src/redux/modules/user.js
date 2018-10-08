// imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SAVE_USERNAME = "SAVE_USERNAME";
const LOGOUT = "LOGOUT";

// action creators

const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        token
    }
}

const saveUsername = (username) => {
    return {
        type: SAVE_USERNAME,
        username
    }
}

const logout = () => {
    return {
        type: LOGOUT
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
            console.log(json);
            if(json.token){
                dispatch(saveToken(json.token));
                dispatch(saveUsername(json.user.username))
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
                dispatch(saveUsername(username));
            }
        })
        .catch(err => console.log(err))
    }
}

const createAccount = (username, password, email, name) => {
    return (dispatch) => {
        fetch("/rest-auth/registration/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: password,
                email,
                name
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token) {
                dispatch(saveToken(json.token));
                dispatch(saveUsername(username));
            }
        })
        .catch(err => console.log(err))
    }
}

// intiial state

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem('jwt'),
    username: localStorage.getItem('username')
}

// reducer

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case SAVE_USERNAME:
            return applySetUsername(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        default:
            return state;
    }
}

// reducer functions

const applyLogout = (state, action) => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    return {
        isLoggedIn: false
    }
}

const applySetUsername = (state, action) => {
    const { username } = action;
    localStorage.setItem("username", username);
    return {
        ...state,
        username
    }
}

const applySetToken = (state, action) => {
    const { token } = action;
    localStorage.setItem("jwt", token);
    return {
        ...state,
        isLoggedIn: true,
        token
    }
}

// exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout
}

export { actionCreators };

// reducer export

export default reducer;
