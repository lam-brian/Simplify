import { NavLink } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";
import { ReactComponent as DocumentIcon } from "../../images/icons/document-text.svg";
import { illustrations } from "../../images";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/home"
          >
            <HomeIcon />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/summarize"
          >
            <DocumentIcon />
            Summarize
          </NavLink>
        </li>
      </ul>

      <img src={illustrations.books} alt="" />
    </nav>
  );
};

export default MainNavigation;
