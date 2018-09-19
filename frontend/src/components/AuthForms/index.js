import React from "react";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

export const LoginForm = props => (
    <div className={styles.formComponent}>
        <form className={styles.form}>
            <input type="text" placeholder="아이디" className={styles.textInput}/>
            <input type="password" placeholder="비밀번호" className={styles.textInput}/>
            <input type="submit" value="로그인" className={styles.button}/>
        </form>
        <span className={styles.divider}>또는</span>
        <span className={styles.facebookLink}><Ionicon icon="logo-facebook" fontSize="20px" color="#385185"/>페이스북으로 로그인하기</span>
        <span className={styles.forgotLink}>비밀번호를 잊어버렸나요?</span>
    </div>
)

export const SignupForm = props => (
    <div className={styles.formComponent}>
        <button className={styles.button}>{" "}<Ionicon icon="logo-facebook" fontSize="20px" color="white"/> 페이스북으로 로그인하기</button>
        <span className={styles.divider}>또는</span>
        <form className={styles.form}>
            <input type="email" placeholder="이메일" className={styles.textInput} />
            <input type="text" placeholder="이름" className={styles.textInput}/>
            <input type="username" placeholder="아이디" className={styles.textInput}/>
            <input type="password" placeholder="비밀번호" className={styles.textInput}/>
            <input type="submit" value="회원가입" className={styles.button}/>
        </form>
        <p className={styles.terms}>가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</p>
    </div>
)
