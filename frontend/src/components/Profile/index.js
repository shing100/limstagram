import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/users";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
