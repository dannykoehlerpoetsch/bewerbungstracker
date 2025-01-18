import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navigation.module.css";
import {
  FilePlus,
  ClipboardText,
  SignOut,
  UserPlus,
  SignIn,
  UserCircle,
  UserCircleCheck,
} from "@phosphor-icons/react";

export default function Navigation() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navList_item}>
          <div className={styles.profileMenu}>
            <button
              onClick={toggleMenu}
              className={styles.profileButton}
              title="Profil"
            >
              {isAuthenticated ? (
                <>
                  <UserCircleCheck size={40} color="gold" />
                </>
              ) : (
                <UserCircle size={40} color="gold" />
              )}
            </button>
            {isMenuOpen && (
              <ul className={styles.dropdownMenu}>
                {isAuthenticated ? (
                  // Menü für eingeloggte Benutzer
                  <>
                    <li onClick={closeMenu} className={styles.navList_item}>
                      <NavLink
                        to="/addapplication"
                        className={styles.navLink}
                        title="Bewerbung hinzufügen"
                      >
                        <FilePlus size={24} color="gold" />
                      </NavLink>
                    </li>
                    <li onClick={closeMenu} className={styles.navList_item}>
                      <NavLink
                        to="/applications"
                        className={styles.navLink}
                        title="Meine Bewerbungen"
                      >
                        <ClipboardText size={24} color="gold" />
                      </NavLink>
                    </li>
                    <li onClick={closeMenu} className={styles.navList_item}>
                      <button
                        onClick={logout}
                        className={`${styles.navLink} ${styles.logout}`}
                        title="Logout"
                      >
                        <SignOut size={24} color="gold" />
                      </button>
                    </li>
                  </>
                ) : (
                  // Menü für nicht eingeloggte Benutzer
                  <>
                    <li onClick={closeMenu} className={styles.navList_item}>
                      <NavLink
                        to="/register"
                        className={styles.navLink}
                        title="Registrieren"
                      >
                        <UserPlus size={24} color="gold" />
                      </NavLink>
                    </li>
                    <li onClick={closeMenu} className={styles.navList_item}>
                      <NavLink
                        to="/login"
                        className={styles.navLink}
                        title="Login"
                      >
                        <SignIn size={24} color="gold" />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
