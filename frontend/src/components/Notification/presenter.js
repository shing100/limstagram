import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Notification = (props, context) => (
    <div className={styles.container}>
            <div className={styles.wrap}>
                {props.loading ?
                    (<Loading />) :
                    (<RenderNotification {...props}/>)}
            </div>
        </div>
);

const RenderNotification = props => props.notificationList.map(notification =>  (
    <div className={styles.notificationBox}>
        <img className={styles.image} src={notification.image.file || null} alt={notification.creator.username}/>
        <div className={styles.comments}>
            <div className={styles.comment}>
                {notification.creator.username}이가
            </div>
            <div className={styles.date}>
                {notification.natural_time} 에
            </div>
            <div className={styles.comment}>
                {notification.comment || null}
            </div>
            <div className={styles.type}>
                {notification.notification_type}
            </div>
        </div>
    </div>
    )
)


Notification.contextTypes = {
    t: PropTypes.func.isRequired
}

Notification.propTypes = {
    loading: PropTypes.bool.isRequired,
    notificationList: PropTypes.array,
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    comment: PropTypes.string,
    image: PropTypes.shape({
        file: PropTypes.string
    }),
    notification_type: PropTypes.string
}

export default Notification;
