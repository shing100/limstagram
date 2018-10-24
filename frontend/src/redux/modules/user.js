// imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SAVE_USERNAME = "SAVE_USERNAME";
const SET_USER_LIST = "SET_USER_LIST";
const LOGOUT = "LOGOUT";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const SET_NOTIFICATION_LIST = "SET_NOTIFICATION_LIST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_IMAGE = "SET_USER_IMAGE";

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

const setUserList = (userList) => {
    return {
        type: SET_USER_LIST,
        userList
    }
}

const setImageList = (imageList) => {
    return {
        type: SET_IMAGE_LIST,
        imageList
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

const setFollowUser = (userId) => {
    return {
        type: FOLLOW_USER,
        userId
    }
}

const setUnfollowUser = (userId) => {
    return {
        type: UNFOLLOW_USER,
        userId
    }
}

const setNotificationList = (notificationList) => {
    return {
        type: SET_NOTIFICATION_LIST,
        notificationList
    }
}

const setProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

const setProifleImageList = (profileImageList) => {
    return {
        type: SET_USER_IMAGE,
        profileImageList
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
            //console.log(json);
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

const getPhotoLikes = (photoId) => {
     return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json))
        })
    };
}

const followUser = (userId) => {
    return (dispatch, getState) => {
        dispatch(setFollowUser(userId))
        const { user : { token } } = getState();
        fetch(`/users/${userId}/follow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout())
            }else if(!response.ok){
                dispatch(setUnfollowUser(userId))
            }
        })
    }
}

const unfollowUser = (userId) => {
    return (dispatch, getState) => {
        dispatch(setUnfollowUser(userId))
        const { user : { token } } = getState();
        fetch(`/users/${userId}/unfollow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout())
            }else if(!response.ok){
                dispatch(setFollowUser(userId))
            }
        })
    }
}

const getExplore = () => {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`/users/explore/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout())
            }
            return response.json()
        })
        .then(json => dispatch(setUserList(json)))
    }
}

const getNotification = () => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`notifications/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout())
            }
            return response.json()
        })
        .then(json => dispatch(setNotificationList(json)))
    }
}

const searchByTerm = (searchTerm) => {
    return async(dispatch, getState) => {
        const { user: { token } } = getState();
        const userList = await searchUsers(token, searchTerm);
        const imageList = await searchImages(token, searchTerm);
        if (userList === 401 || imageList === 401){
            dispatch(logout())
        }
        dispatch(setUserList(userList))
        dispatch(setImageList(imageList))
    }
}

const searchUsers = (token, searchTerm) => {
    return fetch(`/users/search/?username=${searchTerm}`, {
                method: "GET",
                headers: {
                    Authorization: `JWT ${token}`,
                }
            })
            .then(response => {
                if(response.status === 401) {
                    return 401;
                }
                return response.json()
            })
            .then(json => json)
}

const searchImages = (token, searchTerm) => {
    return fetch(`/images/search/?hashtags=${searchTerm}`, {
                method: "GET",
                headers: {
                    Authorization: `JWT ${token}`,
                }
            })
            .then(response => {
                if(response.status === 401) {
                    return 401;
                }
                return response.json()
            })
            .then(json =>  json)
}

const getProfile = (username) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/users/${username}/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout())
            }
            return response.json()
        })
        .then(json => dispatch(setProfile(json)))
    }
}

const getProfileImageList = () => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/images/profileImages/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout())
            }
            return response.json()
        })
        .then(json => dispatch(setProifleImageList(json)))
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
        case SET_USER_LIST:
            return applySetUserList(state, action);
        case SET_IMAGE_LIST:
            return applySetImageList(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        case FOLLOW_USER:
            return applyFollowUser(state, action);
        case UNFOLLOW_USER:
            return applyUnfollowUser(state, action);
        case SET_NOTIFICATION_LIST:
            return applyNorification(state, action);
        case SET_USER_PROFILE:
            return applyUserProfile(state, action);
        case SET_USER_IMAGE:
            return applyUserImage(state, action);
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

const applySetUserList = (state, action) => {
    const { userList } = action;
    return {
        ...state,
        userList
    }
}

const applySetImageList = (state, action) => {
    const { imageList }  = action;
    return {
        ...state,
        imageList
    }
}

const applyNorification = (state, action) => {
    const { notificationList } = action;
    return {
        ...state,
        notificationList
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

const applyFollowUser = (state, action) => {
    const { userId } = action;
    const { userList } = state;
    const updateUserList = userList.map(user => {
        if(user.id === userId){
            return { ...user, following: true }
        }
        return user;
    })
    return {...state, userList: updateUserList}
}

const applyUnfollowUser = (state, action) => {
    const { userId } = action;
    const { userList } = state;
    const updateUserList = userList.map(user => {
        if(user.id === userId){
            return { ...user, following: false }
        }
        return user;
    })
    return {...state, userList: updateUserList}
}

const applyUserProfile = (state, action) => {
    const { profile } = action;
    return {
        ...state,
        profile
    }
}

const applyUserImage = (state, action) => {
    const { profileImageList } = action;
    return {
        ...state,
        profileImageList
    }
}

// exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getPhotoLikes,
    followUser,
    unfollowUser,
    getExplore,
    searchByTerm,
    getNotification,
    getProfile,
    getProfileImageList
}

export { actionCreators };

// reducer export

export default reducer;
