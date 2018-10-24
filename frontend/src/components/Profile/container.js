import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
    state = {
        loading: true
    };

    static porpTypes = {
        getProfile: PropTypes.func.isRequired,
        profile: PropTypes.array
    }

    // Profile 를 받음
    componentWillReceiveProps = nextProps => {
        if(nextProps.profile) {
            this.setState({
                loading: false,
                profile: nextProps.profile
            })
        }
    }

    componentDidMount() {
        const { getProfile } = this.props;
        if(!this.props.profile) {
            getProfile();
        } else {
            this.setState({
                loading: false,
            })
        }
    }
    render() {
        const { profile } = this.props;
        return <Profile {...this.state} profile={profile}/>
    }
}

export default Container;
