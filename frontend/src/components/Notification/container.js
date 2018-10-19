import React, { Component } from "react";
import Notification from "./presenter";

class Container extends Component {
    state = {
        loading: true
    }
    componentWillReceiveProps = nextProps => {
        if (nextProps.notificationList) {
            this.setState({
                loading: false,
                notificationList: nextProps.notificationList
            })
        }
    }

    render() {
        return (
            <Notification {...this.props} {...this.state}/>
        );
    }
}

export default Container;
