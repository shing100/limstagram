import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const PhotoActions = (props, context) => (
    <div className={styles.actions}>
        <div className={styles.icons}>
            <span className={styles.icon} onClick={props.handleHeartClick}>
                {props.isLiked ? (
                <Ionicon icon="ios-heart" fontSize="24px" color="#EB4B59" />
                ) : (
                <Ionicon icon="ios-heart-outline" fontSize="24px" color="black" />
                )}
            </span>
            <span className={styles.icon}>
                <Ionicon icon="ios-text-outline" fontSize="24px" color="black"/>
            </span>
        </div>
        <span className={styles.likes}>{props.number === 0 ? context.t("좋아요를 눌러주세요") : context.t(`좋아요 ${props.number}개`)}</span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired
}

PhotoActions.propTypes = {
    number: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    photoId: PropTypes.number.isRequired,
    handleHeartClick: PropTypes.func.isRequired
}

export default PhotoActions;
