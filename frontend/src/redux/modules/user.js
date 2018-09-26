// imports

// actions

// action creators

// API actions

const facebookLogin = (access_token) => {
    return (dispatch) => {
        fetch("/users/login/facebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }
}

// intiial state

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') || false
}

// reducer

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
        return state;
    }
}

// reducer functions

// exports

const actionCreators = {
    facebookLogin
}

export { actionCreators };

// reducer export

export default reducer;
