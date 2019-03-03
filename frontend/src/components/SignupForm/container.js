import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends Component {
    state = {
        email: "",
        name: "",
        username: "",
        password: ""
    };

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired
    }
    render() {
        const { email, name, username, password } = this.state;
        return <SignupForm handleInputChange={this._handleInputChange}
                        handleSubmit={this._handleSubmit}
                        handleFacebookLogin={this._handleFacebookLogin}
                        emailValue={email}
                        nameValue={name}
                        usernameValue={username}
                        passwordValue={password}/>
    }
    _handleInputChange = event => {
        const { target: {value, name} } = event;
        this.setState({
            [name]: value
        })
    }

    _handleSubmit = async event => {
        const { username, password, email, name } = this.state;
        const { createAccount } = this.props;
        event.preventDefault();
        const createAccountResult = await createAccount(username, password, email, name);
        if (!createAccountResult) {
            alert("비밀번호 길이는 8자 이상으로 해주세요");
        }

    }

    _handleFacebookLogin = (response) => {
        const { facebookLogin } = this.props;
        facebookLogin(response.accessToken);
    }
}

export default Container;
