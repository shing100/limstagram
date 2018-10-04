import React, { Component } from "react";
import CommentsBox from "./presenter";

class Container extends Component {
    render() {
        return <CommentsBox {...this.props}/>;
    }
}

export default Container;
