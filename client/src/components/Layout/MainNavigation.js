import { NavLink } from "react-router-dom";
import Reg from "../Login/Login";
import Button from "../FormElements/Button/Button";
import { simplifyLogo } from "../../images";
import styles from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
const MainNavigation = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/">
              <img src={simplifyLogo} alt="logo" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/summarize">Summarize</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.sidemenu}>
        <Button onClick={toggleModal}>Log in</Button>
        <Button onClick={toggleModal} className="btn--primary">
          Sign Up
        </Button>
        {modal && <Reg />}
      </div>
    </header>
  );
};

export default MainNavigation;
