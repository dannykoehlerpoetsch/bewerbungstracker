import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <a
        href="https://dakopo.vercel.app/"
        target="_blank"
        className={styles.footerLink}
      >
        &copy; by DaKoPo {year}
      </a>
    </footer>
  );
}
