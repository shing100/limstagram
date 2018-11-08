import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component {
    state = {
        username: "",
        password: ""
    };

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired,
        usernameLogin: PropTypes.func.isRequired
    }

    render() {
        const { username, password } = this.state;
        return <LoginForm handleInputChange={this._handleInputChange}
                        handleSubmit={this._handleSubmit}
                        handleFacebookLogin={this._handleFacebookLogin}
                        usernameValue={username}
                        passwordValue={password}/>
    }
    _handleInputChange = event => {
        // const value = event.target.value;
        const { target: {value, name} } = event;
        this.setState({
            //username or password
            [name]: value
        })
    }

    _handleSubmit = async event => {
        const { usernameLogin } = this.props;
        const { username, password } = this.state;
        event.preventDefault()
        const loginResult = await usernameLogin(username, password);
        if(!loginResult) {
            alert("로그인 실패");
        }
    }

    _handleFacebookLogin = async (response) => {
        const { facebookLogin } = this.props;
        const loginResult = await facebookLogin(response.accessToken);
        if(!loginResult){
            alert("로그인 실패");
        }
    }
}

export default Container;
