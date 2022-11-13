import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { logUserOut } from "../../store/login-slice";
import { noteActions } from "../../store/note-slice";

import Button from "../FormElements/Button/Button";
import { simplifyLogo, icons } from "../../images";
import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";
import { ReactComponent as DocumentIcon } from "../../images/icons/document-text.svg";
import { ReactComponent as SettingsIcon } from "../../images/icons/settings.svg";
import { ReactComponent as LogoutIcon } from "../../images/icons/logout.svg";
import { illustrations } from "../../images";
import styles from "./MainNavigation.module.css";
import HamburgerBtn from "../UI/HamburgerBtn/HamburgerBtn";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const { pathname } = useLocation();

  const toggleMobileNav = () => {
    setOpenMobileNav((state) => !state);
  };

  useEffect(() => {
    setOpenMobileNav(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${isLoggedIn ? styles.sidebar : ""}`}>
      {isLoggedIn && (
        <HamburgerBtn toggleNav={toggleMobileNav} isOpen={openMobileNav} />
      )}
      <div className={styles.logo}>
        <img src={simplifyLogo} alt="logo" />
      </div>
      {isLoggedIn && (
        <>
          <nav
            className={`${styles.nav} ${openMobileNav ? styles.active : ""}`}
          >
            <ul>
              <li>
                <Button onClick={() => navigate("/new-note")}>
                  <img src={icons.plus} alt="" /> Create study set
                </Button>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/home"
                >
                  <HomeIcon />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/summarize"
                >
                  <DocumentIcon />
                  Summarize
                </NavLink>
              </li>
              <li className={styles.settings}>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/settings"
                >
                  <SettingsIcon />
                  Account Settings
                </NavLink>
              </li>
              <li>
                <Button
                  onClick={() => {
                    dispatch(logUserOut());
                    dispatch(noteActions.clearNotes());
                  }}
                >
                  <LogoutIcon />
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
          <div className={styles.illustration}>
            <img src={illustrations.books} alt="" />
          </div>
        </>
      )}
      {!isLoggedIn && (
        <div className={styles.actions}>
          <Button
            style={{ color: "var(--primary-white" }}
            onClick={() => dispatch(uiActions.openLoginModal("login"))}
          >
            Log in
          </Button>
          <Button
            className="btn--primary"
            style={{
              backgroundColor: "var(--primary-blue-light)",
              color: "var(--primary-blue-dark)",
            }}
            onClick={() => dispatch(uiActions.openLoginModal("signup"))}
          >
            Sign Up
          </Button>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
