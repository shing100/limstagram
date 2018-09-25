import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";


const Auth = (props, context) => (
    <main className={styles.auth}>
        <div className={styles.column}>
            <img src={require("images/phone.png")} alt={context.t("임스타그램 미리보기 사진입니다")}/>
        </div>
        <div className={styles.column}>
            <div className={`${styles.whiteBox} ${styles.formBox}`}>
                <img src={require("images/logo.png")} alt={context.t("로고")}/>
                {props.action === "login" && <LoginForm/>}
                {props.action === "signup" && <SignupForm/>}
            </div>
            <div className={styles.whiteBox}>
                {props.action === "login" && (
                    <p className={styles.text}>
                        {context.t("아이디가 없으세요?")} {" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            {context.t("가입하기")}
                        </span>
                    </p>)}
                {props.action === "signup" && (
                    <p className={styles.text}>
                        {context.t("아이디가 있으신가요?")} {" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            {context.t("로그인")}
                        </span>
                    </p>)}
            </div>
            <div className={styles.appBox}>
                <span>{context.t("앱을 다운로드하세요.")}</span>
                <div className={styles.appstores}>
                    <img src={require("images/ios.png")} alt={context.t("아이폰 앱 다운로드")}/>
                    <img src={require("images/android.png")} alt={context.t("안드로이드 앱 다운로드")}/>
                </div>
            </div>
        </div>
    </main>
);

Auth.contextTypes = {
    t: PropTypes.func.isRequired
}

export default Auth;
