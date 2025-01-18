import React from "react";
import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { HouseLine } from "@phosphor-icons/react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.navList_item}>
        <NavLink to="/" className={styles.navLink} title="zur Startseite">
          <HouseLine size={32} color="gold" />
        </NavLink>
      </div>
      <div className={styles.headerRight}>
        {isAuthenticated && <span className={styles.username}>{user}</span>}
        <Navigation />
      </div>
    </header>
  );
}
