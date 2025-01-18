import React from "react";
import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { HouseLine } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navList_item}>
        <NavLink to="/" className={styles.navLink} title="zur Startseite">
          <HouseLine size={32} color="gold" />
        </NavLink>
      </div>
      {/* <div className={styles.heading}>
        <h1 className={styles.heading_content}>AppliTrack</h1>
      </div> */}
      <Navigation />
    </header>
  );
}
