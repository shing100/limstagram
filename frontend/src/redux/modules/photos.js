// imports

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
        .then(response => response.json())
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
