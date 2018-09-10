// imports

// actions

// action creators

// intiial state

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') || false
}

// reducer

function reducer(state = initialState, action) {
    switch(action.type) {
        default:
        return state;
    }
}

// reducer functions

// exports

// reducer export

export default reducer;
