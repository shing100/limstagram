import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    console.log(ownProps)
    const { photos : { feed } } = state;
    return {
        feed
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    const username = localStorage.getItem('username')
    return {
        getUserProfile: () => {
            dispatch(userActions.getUserProfile(username))
        },
        getUserImage: () => {
            dispatch(userActions.getUserImage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
