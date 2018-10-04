import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";

const PhotoActions = (props, context) => (
    <div>
        <div>
            <span><Ionicon icon="ios-heart-outline" fontsize="28px" color="black"/></span>
            <span><Ionicon icon="ios-text-outline" fontsize="28px" color="black"/></span>
        </div>

        <span>{props.number === 1 ? context.t("좋아요") : context.t("좋아요")}{" "}{props.number}{context.t("개")}</span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired
}

PhotoActions.propTypes = {
    number: PropTypes.number.isRequired
}

export default PhotoActions;
