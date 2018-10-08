import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPhotoLikes: () => {
            dispatch(userActions.getPhotoLikes(ownProps.id));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
