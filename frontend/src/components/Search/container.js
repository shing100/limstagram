import React, { Component } from "react";
import Explore from "./presenter";

class Container extends Component {
    state = {
        loading: true
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return <Explore {...this.state}/>;
    }
}

export default Container;
