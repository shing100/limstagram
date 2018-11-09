import React , { Component } from "react";
import Proptypes from "prop-types";
import Logout from "./presenter";

class Container extends Component {

    static proptytes = {
        logout: Proptypes.func.isRequired
    }
    render() {
        return (
            <Logout handleLogout={this._handleLogout}/>
        )
    }
    _handleLogout = (event) => {
        const { logout } = this.props;
        logout();
    }
}

export default Container;
