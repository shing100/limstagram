import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const UserDisplay = (props, context) => (
  <div className={props.horizontal ? styles.horizontal : styles.vertical}>
    <div className={styles.column}>
      <img
        src={props.user.profile_image || require("images/noPhoto.png")}
        alt={props.user.username}
        className={props.big ? styles.bigAvatar : styles.avatar}
      />
      <div className={styles.user}>
        <span className={styles.username}>{props.user.username}</span>
        <span className={styles.name}>{props.user.name}</span>
      </div>
    </div>
    <span className={styles.column}>
        <button className={styles.button} onClick={props.handleClick}>
            {props.user.following ? context.t("언팔로우") : context.t("팔로우")}
        </button>
    </span>
  </div>
);

UserDisplay.contextTypes = {
  t: PropTypes.func.isRequired
};

UserDisplay.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    following: PropTypes.bool.isRequired
  }).isRequired,
  big: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool
};

UserDisplay.defaultProps = {
  big: false
};

export default UserDisplay;
