import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CommentsBox = (props, context) => (
    <form>
        <textarea placeholder={context.t("댓글 달기...")}/>
    </form>
)

CommentsBox.contextTypes = {
    t: PropTypes.func.isRequired
}

export default CommentsBox;
