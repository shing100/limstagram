import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Navigation = (props, context) => (
    <div className={styles.navigation}>
        <div className={styles.inner}>
            <div className={styles.column}>
            <Link to="/">
            <img
                src={require("images/logo.png")}
                className={styles.logo}
                alt={context.t("Logo")}
            />
            </Link>
            </div>
            <div className={styles.column}>
                <form onSubmit={props.onSubmit}>
                    <input
                        type="text"
                        placeholder={context.t("검색")}
                        className={styles.searchInput}
                        value={props.value}
                        onChange={props.onInputChange}
                    />
                </form>
            </div>
            <div className={styles.column}>
                <div className={styles.navIcon}>
                <Link to="/explore">
                    <Ionicon icon="ios-compass-outline" fontSize="28px" color="black" />
                </Link>
                </div>
                <div className={styles.navIcon} onClick={props.seeingNotification ? props.closeNotification : props.openNotification}>
                    {props.seeingNotification ? (<Ionicon icon="ios-heart" fontSize="28px" color="red" />) :
                        (<Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />)}
                </div>
                <div className={styles.navIcon}>
                <Link to="/profile">
                    <Ionicon icon="ios-person-outline" fontSize="32px" color="black" />
                </Link>
                </div>
            </div>
        </div>
    </div>
);


Navigation.contextTypes = {
    t: PropTypes.func.isRequired
}

Navigation.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    openNotification: PropTypes.func.isRequired,
    closeNotification: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    notificationList: PropTypes.array,
    seeingNotification: PropTypes.bool.isRequired
}

export default Navigation;
