import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
    state = {
        loading: true
    };

    static porpTypes = {
        getExplore: PropTypes.func.isRequired,
        userList: PropTypes.array
    }

    // userList 를 받음
    componentWillReceiveProps = nextProps => {
        if(nextProps.userList) {
            this.setState({
                loading: false,
                userList: nextProps.userList
            })
        }
    }

    componentDidMount() {
        const { getExplore } = this.props;
        getExplore()
    }
    render() {
        const { userList } = this.props;
        return <Explore {...this.state} userList={userList}/>
    }
}

export default Container;
