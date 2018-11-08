import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user.js";
import Container from "./container";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facebookLogin: (access_token) => {
            return dispatch(userActions.facebookLogin(access_token));
        },
        usernameLogin: (email, password) => {
            return dispatch(userActions.usernameLogin(email, password));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);
