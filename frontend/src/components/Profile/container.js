import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
    state = {
        loading: true
    };

    // Profile 를 받음
    componentWillReceiveProps = nextProps => {
        if(nextProps.profile) {
            this.setState({
                loading: false
            })
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
        })
    }
    render() {
        const { userProfile } = this.props;
        return <Profile {...this.state} profile={userProfile}/>
    }
}

export default Container;
