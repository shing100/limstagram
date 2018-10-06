// imports
import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";

// action creators

const setFeed = (feed) => {
    return {
        type: SET_FEED,
        feed
    }
}

const doLikePhoto = (photoId) => {
    return {
        type: LIKE_PHOTO,
        photoId
    }
}

const doUnlikePhoto = (photoId) => {
    return {
        type: UNLIKE_PHOTO,
        photoId
    }
}

// API actions

const getFeed = () => {
    return (dispatch, getState) => {
        const  { user : { token } } = getState();
        fetch("/images/", {
            headers: {
                Authorization: `JWT ${token}`
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

const likePhoto = (photoId) => {
    return (dispatch, getState) => {
        dispatch(doLikePhoto(photoId));
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doUnlikePhoto(photoId));
            }
        });
    };
}


const unlikePhoto = (photoId) => {
    return (dispatch, getState) => {
        // 액션을 실행하고 바로 피드백을 주기위함
        dispatch(doUnlikePhoto(photoId))
        const { user : { token } } = getState();
        fetch(`/images/${photoId}/unlikes/`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userActions.logout());
            }else if(!response.ok){
                dispatch(doLikePhoto(photoId));
            }
        })
    }
}

// intiial state

const intialState = {}

// reducer

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        case LIKE_PHOTO:
            return applyLikePhoto(state, action);
        case UNLIKE_PHOTO:
            return applyUnlikePhoto(state, action);
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

const applyLikePhoto = (state, action) => {
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
            if(photo.id === photoId) {
                return {...photo, is_liked: true, like_count: photo.like_count + 1};
            }
            return photo;
        });
    return {...state, feed: updatedFeed};
}

const applyUnlikePhoto = (state, action) => {
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
            if(photo.id === photoId) {
                return {...photo, is_liked: false, like_count: photo.like_count - 1};
            }
            return photo;
        });
    return {...state, feed: updatedFeed};
}

// exports

const actionCreators = {
    getFeed,
    likePhoto,
    unlikePhoto
}

export { actionCreators }

// reducer export

export default reducer;
