import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";

import Registration from "../Login/Registration";
import Button from "../FormElements/Button/Button";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import { logos } from "../../images";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const [modalOpen, setModalOpen] = useState(false);

  let actions = (
    <>
      <Button
        onClick={() => {
          // setModalOpen(true);
          dispatch(loginActions.login());
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
    </>
  );

  if (isLoggedIn) {
    actions = (
      <>
        <Button onClick={() => dispatch(loginActions.logout())}>
          <SearchIcon />
        </Button>

        <Button className="btn--avatar">B</Button>
      </>
    );
  }

  return (
    <header
      className={
        isLoggedIn ? `${styles.header} ${styles.headerLoggedIn}` : styles.header
      }
    >
      <NavLink to="/">
        <img src={isLoggedIn ? logos.logoLogged : logos.logo} alt="logo" />
      </NavLink>

      <div className={styles.actions}>{actions}</div>
    </header>
  );
};

export default Header;
