import React from "react";
import logo from 'images/log-out.svg';
import Proptyles from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";


const Logout = props => (
        <Link to={"/"}><img className={styles.logout} src={logo} alt="로그아웃" onClick={props.handleLogout}/></Link>
);

Logout.propTypes = {
    handleLogout: Proptyles.func.isRequired
}



export default Logout;
