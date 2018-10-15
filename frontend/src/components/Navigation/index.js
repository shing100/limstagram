import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";
import { push } from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
    const { user : { notificationList } } = state;
    return {
        notificationList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goToSearch: (searchTerm) => {
            dispatch(push(`/search/${searchTerm}`));
        },
        getNotification: () => {
            dispatch(userActions.getNotification());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
