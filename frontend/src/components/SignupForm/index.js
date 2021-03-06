import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        facebookLogin: (access_token) => {
            dispatch(userActions.facebookLogin(access_token));
        },
        createAccount: (username, password, email, name) => {
            return dispatch(userActions.createAccount(username, password, email, name));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);
