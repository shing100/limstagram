import React from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import styles from "./styles.scss";

const CommentsBox = (props, context) => (
    <form className={styles.commentBox}>
        <Textarea className={styles.input} placeholder={context.t("댓글 달기...")}/>
    </form>
)

CommentsBox.contextTypes = {
    t: PropTypes.func.isRequired
}

export default CommentsBox;
