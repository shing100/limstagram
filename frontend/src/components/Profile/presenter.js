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
        <div className={styles.wrap}>
            <img
                src={props.profile.profile_image || require("images/noPhoto.png")}
                alt={props.profile.username}
                className={styles.image}
            />
            <ul>
            <li>
                <div className={styles.userProfile}>
                    <span className={styles.username}>
                        {props.profile.username}
                    </span>
                    <span className={styles.edit}>
                        프로필 편집
                    </span>
                </div>
            </li>
            <li>
                <div className={styles.intro}>
                    <span>게시물  <a className={styles.count}>{props.profile.images.length}</a></span>
                    <span>팔로워  <a className={styles.count}>{props.profile.followers_count}</a></span>
                    <span>팔로우  <a className={styles.count}>{props.profile.following_count}</a></span>
                </div>
            </li>
            <ul className={styles.contact}>
                <li className={styles.name}>{props.profile.name}</li>
                <li className={styles.website}><a href={props.profile.website}>{props.profile.website}</a></li>
                <li className={styles.bio}>{props.profile.bio}</li>
            </ul>
            </ul>
        </div>
        <div className={styles.content}>
        {props.profile.images.map(image => <PhotoDisplay photo={image} key={image.id}/>)}
        </div>
    </div>
)

Profile.propsTypes = {
    loading: PropsTypes.bool.isRequired,
    profile: PropsTypes.array
}

export default Profile;
