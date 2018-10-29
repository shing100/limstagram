import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const username = localStorage.getItem('username')
    return {
        getProfile: () => {
            dispatch(userActions.getProfile(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
