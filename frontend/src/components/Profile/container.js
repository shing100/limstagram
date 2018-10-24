import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
    state = {
        loading: true
    };

    static porpTypes = {
        getUserProfile: PropTypes.func.isRequired,
        getUserImage: PropTypes.func.isRequired,
        userProfile: PropTypes.array,
        imageList: PropTypes.array
    }

    // Profile 를 받음
    componentWillReceiveProps = nextProps => {
        if (nextProps.imageList) {
            this.setState({
                loading: false,
                imageList: nextProps.imageList
            })
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }
    render() {
        const { userProfile } = this.props;
        return <Profile {...this.state} profile={userProfile}/>
    }
}

export default Container;
