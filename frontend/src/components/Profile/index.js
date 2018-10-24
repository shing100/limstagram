import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

const mapDispatchToProps = (dispatch, ownProps) => {
    const username = localStorage.getItem('username')
    return {
        getProfile: () => {
            dispatch(userActions.getProfile(username))
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);
