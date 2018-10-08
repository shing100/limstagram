import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import Loading from "components/Loading";
import styles from "./styles.scss";

const UserList = (props, context) => (
    <div className={styles.container}>
        <div className={styles.overlay} />
            <div className={styles.box}>
                <header className={styles.header}>
                    <h4 className={styles.title}>{props.title}</h4>
                    <Ionicon icon="md-close" fontSize="20px" color="black" />
                </header>
            <div className={styles.content}>{props.loading ? <Loading /> : null}</div>
        </div>
    </div>
);

UserList.propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array
};


export default UserList;
