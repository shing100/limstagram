import React from "react";
import styles from "./styles.scss";
import { LoginForm, SignupForm } from "components/AuthForms";

const Auth = (props, context) => (
    <main className={styles.auth}>
        <div className={styles.column}>
            <img src={require("images/phone.png")} alt="임스타그램 미리보기 사진입니다"/>
        </div>
        <div className={styles.column}>
            <div className={`${styles.whiteBox} ${styles.formBox}`}>
                <img src={require("images/logo.png")} alt="로고"/>
                {props.action === "login" && <LoginForm/>}
                {props.action === "signup" && <SignupForm/>}
            </div>
            <div className={styles.whiteBox}>
                {props.action === "login" && (
                    <p className={styles.text}>
                        아이디가 없으세요? {" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            가입하기
                        </span>
                    </p>)}
                {props.action === "signup" && (
                    <p className={styles.text}>
                        아이디가 있으신가요? {" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            로그인
                        </span>
                    </p>)}
            </div>
            <div className={styles.appBox}>
                <span>앱을 다운로드하세요.</span>
                <div className={styles.appstores}>
                    <img src={require("images/ios.png")} alt="아이폰 앱 다운로드"/>
                    <img src={require("images/android.png")} alt="안드로이드 앱 다운로드"/>
                </div>
            </div>
        </div>
    </main>
);

export default Auth;
