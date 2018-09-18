import React from "react";
import styles from "./styles.scss";

 const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Iimstagram 정보</li>
          <li className={styles.listItem}>지원</li>
          <li className={styles.listItem}>홍보 센터</li>
          <li className={styles.listItem}>API</li>
          <li className={styles.listItem}>채용 정보</li>
          <li className={styles.listItem}>개인정보처리방침</li>
          <li className={styles.listItem}>약관</li>
          <li className={styles.listItem}>디렉터리</li>
          <li className={styles.listItem}>프로필</li>
          <li className={styles.listItem}>해시태그</li>
          <li className={styles.listItem}>언어</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>© 2018 Limstagram</span>
    </div>
  </footer>
);

 export default Footer;
