import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Notification = (props, context) => (
    <div className={styles.container}>
            <div className={styles.wrap}>
                {props.loading ?
                    (<Loading />) :
                    (<RenderNotification {...props} />)}
            </div>
        </div>
);

const RenderNotification = props => (
    <div className={styles.notification}>
        {props.notificationList.map(notification =>  (
            <div className={styles.notification-item}>{notification}</div>
        ))}
    </div>
)

Notification.contextTypes = {
    t: PropTypes.func.isRequired
}

Notification.propTypes = {
    loading: PropTypes.bool.isRequired,
    notificationList: PropTypes.array
}

export default Notification;
