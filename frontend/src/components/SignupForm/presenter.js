import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <button className={formStyles.button}>{" "}<Ionicon icon="logo-facebook" fontSize="20px" color="white"/>{context.t("페이스북으로 로그인하기")}</button>
        <span className={formStyles.divider}>{context.t("또는")}</span>
        <form className={formStyles.form}>
            <input type="email" placeholder={context.t("이메일")} className={formStyles.textInput} />
            <input type="text" placeholder={context.t("이름")} className={formStyles.textInput}/>
            <input type="username" placeholder={context.t("아이디")} className={formStyles.textInput}/>
            <input type="password" placeholder={context.t("비밀번호")} className={formStyles.textInput}/>
            <input type="submit" value={context.t("회원가입")} className={formStyles.button}/>
        </form>
        <p className={formStyles.terms}>가입하면 Iimstagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</p>
    </div>
)

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
}

export default SignupForm;
