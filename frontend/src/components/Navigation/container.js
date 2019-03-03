import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
    state = {
        term: "",
        seeingNotification: false
    }
    static propTypes = {
        goToSearch: PropTypes.func.isRequired,
        getNotification: PropTypes.func,
        notificationList: PropTypes.array
    }
    render() {
        const { term, seeingNotification } = this.state;
        const { notificationList } = this.props;
        return (
            <Navigation
                onSubmit={this._onSubmit}
                onInputChange={this._onInputChange}
                openNotification={this._openNotification}
                closeNotification={this._closeNotification}
                value={term}
                seeingNotification={seeingNotification}
                notificationList={notificationList}
            />
        );
    }
    _openNotification = event => {
        const { getNotification } = this.props;
        this.setState({
            seeingNotification: true
        })
        getNotification()
    }

    _closeNotification = event => {
        this.setState({
            seeingNotification: false
        })
    }

    _onInputChange = event => {
        const { target : { value } } = event;
        this.setState({
            term: value
        })
    }

    _onSubmit = event => {
        const { goToSearch } = this.props;
        const { term } = this.state;
        event.preventDefault();
        goToSearch(term);
        this.setState({
            term: ""
        })
    }
}

export default Container;
