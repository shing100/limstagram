import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const PhotoActions = (props, context) => (
    <div className={styles.actions}>
        <div className={styles.icons}>
            <span className={styles.icon}><Ionicon icon="ios-heart-outline" fontsize="34px" color="black"/></span>
            <span className={styles.icon}><Ionicon icon="ios-text-outline" fontsize="34px" color="black"/></span>
        </div>

        <span className={styles.likes}>{props.number === 1 ? context.t("좋아요") : context.t("좋아요")}{" "}{props.number}{context.t("개")}</span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired
}

PhotoActions.propTypes = {
    number: PropTypes.number.isRequired
}

export default PhotoActions;
