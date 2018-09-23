import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

export const LoginForm = (props, context) => (
    <div className={styles.formComponent}>
        <form className={styles.form}>
            <input type="text" placeholder={context.t("아이디")} className={styles.textInput}/>
            <input type="password" placeholder={context.t("비밀번호")} className={styles.textInput}/>
            <input type="submit" value={context.t("로그인")} className={styles.button}/>
        </form>
        <span className={styles.divider}>{context.t("또는")}</span>
        <span className={styles.facebookLink}><Ionicon icon="logo-facebook" fontSize="20px" color="#385185"/>{context.t("페이스북으로 로그인하기")}</span>
        <span className={styles.forgotLink}>{context.t("비밀번호를 잊어버렸나요?")}</span>
    </div>
)

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
}

export const SignupForm = (props, context) => (
    <div className={styles.formComponent}>
        <button className={styles.button}>{" "}<Ionicon icon="logo-facebook" fontSize="20px" color="white"/>{context.t("페이스북으로 로그인하기")}</button>
        <span className={styles.divider}>{context.t("또는")}</span>
        <form className={styles.form}>
            <input type="email" placeholder={context.t("이메일")} className={styles.textInput} />
            <input type="text" placeholder={context.t("이름")} className={styles.textInput}/>
            <input type="username" placeholder={context.t("아이디")} className={styles.textInput}/>
            <input type="password" placeholder={context.t("비밀번호")} className={styles.textInput}/>
            <input type="submit" value={context.t("회원가입")} className={styles.button}/>
        </form>
        <p className={styles.terms}>가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</p>
    </div>
)

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
}
