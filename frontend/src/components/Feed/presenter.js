import React from "react";
import PropsTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Feed = props => {
    if(props.loading) {
        return <LoadingFeed/>
    }
};

const LoadingFeed = props => (
    <div className={styles.feed}>
        <Loading/>
    </div>
);

Feed.propsTypes = {
    loading: PropsTypes.bool.isRequired
}

export default Feed;
