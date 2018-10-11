import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match : { params : { searchTerm } } } = ownProps;
    return {
        searchByTerm: () => {
            dispatch(userActions.searchByTerm());
        }
    }
}


export default connect(null, mapDispatchToProps)(Container);
