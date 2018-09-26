import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <button className={formStyles.button}>{" "}<Ionicon icon="logo-facebook" fontSize="20px" color="white"/>{context.t("페이스북으로 로그인하기")}</button>
        <span className={formStyles.divider}>{context.t("또는")}</span>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input type="email" placeholder={context.t("이메일")} className={formStyles.textInput}  value={props.emailValue} onChange={props.handleInputChange} name="email"/>
            <input type="text" placeholder={context.t("이름")} className={formStyles.textInput} value={props.fullnameValue} onChange={props.handleInputChange} name="fullname"/>
            <input type="username" placeholder={context.t("아이디")} className={formStyles.textInput} value={props.usernameValue} onChange={props.handleInputChange} name="username"/>
            <input type="password" placeholder={context.t("비밀번호")} className={formStyles.textInput} value={props.passwordValue} onChange={props.handleInputChange} name="password"/>
            <input type="submit" value={context.t("회원가입")} className={formStyles.button}/>
        </form>
        <p className={formStyles.terms}>{context.t("가입하면 Iimstagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.")}</p>
    </div>
)

SignupForm.propTypes = {
    emailValue: PropTypes.string.isRequired,
    fullnameValue: PropTypes.string.isRequired,
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
}

export default SignupForm;
