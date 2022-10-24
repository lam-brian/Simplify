import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Registration from "../Login/Registration";
import Button from "../FormElements/Button/Button";
import { simplifyLogo } from "../../images";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Log in
        </Button>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="btn--primary"
        >
          Sign Up
        </Button>
        {modalOpen && <Registration setOpenModal={setModalOpen} />}
      </div>
    </header>
  );
};

export default MainNavigation;
