import React, { Component } from "react";
import Feed from "./presenter";

class Container extends Component {
    state = {
        lodding: true
    }
    render() {
        return <Feed {...this.state}/>
    }
}

export default Container;
