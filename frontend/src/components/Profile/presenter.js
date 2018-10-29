import React from "react";
import PropsTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import PhotoDisplay from "components/PhotoDisplay";

const Profile = props => {
    if(props.loading) {
        return <LoadingProfile/>
    }else if(props.profile) {
        return <RenderProfile {...props}/>
    }
};

const LoadingProfile = props => (
    <div className={styles.profile}>
        <Loading/>
    </div>
);

const RenderProfile = props => (
    <div className={styles.profile}>
        {props.profile.username}
        {props.profile.name}
        {props.profile.profile_image}
        {props.profile.followers_count}
        {props.profile.following_count}
        {props.profile.website}
        {props.profile.bio}
        {props.profile.images.map(image => <PhotoDisplay photo={image} key={image.id}/>)}
    </div>
)

Profile.propsTypes = {
    loading: PropsTypes.bool.isRequired,
    profile: PropsTypes.array
}

export default Profile;
