import { NavLink } from "react-router-dom";

import Button from "../UI/Button/Button";
import { logo } from "../../images";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Summarize</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.sidemenu}>
        <Button>Log in</Button>
        <Button className="btn--primary">Sign Up</Button>
      </div>
    </header>
  );
};

export default MainNavigation;
