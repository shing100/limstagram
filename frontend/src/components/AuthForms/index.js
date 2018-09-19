import React from "react";
import styles from "./styles.scss";

export const LoginForm = props => (
    <div>
        <form>
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <input type="submit" placeholder="로그인"/>
        </form>
        <span>또는</span>
        <span>페이스북으로 로그인하기</span>
        <span>비밀번호를 잊어버렸나요?</span>
    </div>
)

export const SignupForm = props => (
    <div>
        <button>페이스북으로 회원가입하기</button>
        <span>또는</span>
        <form>
            <input type="email" placeholder="이메일" />
            <input type="text" placeholder="이름"/>
            <input type="username" placeholder="아이디"/>
            <input type="password" placeholder="비밀번호"/>
            <input type="submit" value="회원가입"/>
        </form>
        <p>가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</p>
    </div>
)
