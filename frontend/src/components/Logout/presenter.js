import React from "react";
import logo from 'images/log-out.svg';
import Proptyles from "prop-types";
import styles from "./styles.scss";


const Logout = props => (
        <img className={styles.logout} src={logo} alt="로그아웃" onClick={props.handleLogout}/>
);

Logout.propTypes = {
    handleLogout: Proptyles.func.isRequired
}



export default Logout;
