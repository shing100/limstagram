import React from "react";
import PropsTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import PhotoDisplay from "components/PhotoDisplay";

const Feed = props => {
    if(props.loading) {
        return <LoadingProfile/>
    }else if(props.photoList) {
        return <RenderProfile {...props}/>
    }
};

const LoadingProfile = props => (
    <div className={styles.loading}>
        <Loading/>
    </div>
);

const RenderProfile = props => (
    <div className={styles.photoList}>
        {props.photoList.map(photo => <PhotoDisplay {...photo} key={photo.id}/>)}
    </div>
)

Feed.propsTypes = {
    loading: PropsTypes.bool.isRequired,
    photoList: PropsTypes.array
}

export default Feed;
