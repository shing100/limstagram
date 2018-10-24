import React from "react";
import PropsTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import PhotoDisplay from "components/PhotoDisplay";
import ProfileDisplay from "components/ProfileDisplay";

const Profile = props => {
    if(props.loading) {
        return <LoadingProfile/>
    }else{
        return (
            <div>
                <RenderProfile {...props}/>
            </div>
        )
    }
};

const LoadingProfile = props => (
    <div className={styles.loading}>
        <Loading/>
    </div>
);

const RenderProfile = props => (
    <div className={styles.photoList}>

    </div>
)

const RenderPhotoDisplay = props =>
  props.photoList.map(photo => <PhotoDisplay photo={photo} key={photo.id} />);

Profile.propsTypes = {
    loading: PropsTypes.bool.isRequired,
    photoList: PropsTypes.array,
    profile: PropsTypes.array
}

export default Profile;
