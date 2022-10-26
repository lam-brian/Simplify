import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import Registration from "../Login/Registration";
import Button from "../FormElements/Button/Button";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import { logos } from "../../images";
import styles from "./Header.module.css";

const Header = () => {
   const [modalOpen, setModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [settingOpen, setSettingOpen] = useState(false);
  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0].tagName !== 'BUTTON') {
          setSettingOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown)
  }, []);

  let actions = (
    <>
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
    </>
  );

  if (isLoggedIn) {
    actions = (
      <>
        <Button>
          <SearchIcon />
        </Button>
        <div className="dropdown">
          <Button
            onClick={() => {
              setSettingOpen(true);
            }}
            className="btn--avatar"
          >
            B
          </Button>
          {settingOpen && <Dropdown setOpenModal={setSettingOpen} />}
        </div>
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
