import styles from "./Settings.module.css";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { useState } from "react";
import Helmet from "react-helmet";

const Settings = ({ username, email }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <Helmet bodyAttributes={{ style: "background-color : #EDF3FE" }} />
      <div className={styles.container}>
        Account Setting
        <div className={styles.avatar}>B</div>
        <div className={styles.settings}>
          <div className={styles.profile}>
            <h3>Profile Details</h3>
            <div className={styles.label}>Full name</div>
            <input
              id="name"
              type="text"
              value={username}
              className={styles.input}
            />
            <div className={styles.label}>Email</div>
            <input id="email" value={email} className={styles.input} />
            <div className={styles.label}>Password</div>
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className={styles.button}
            >
              Change password
            </button>
            {modalOpen && <ChangePassword setOpenModal={setModalOpen} />}
          </div>
          <div className={styles.close}>
            <h3>Close Account</h3>
            <button
              onClick={() => {
                setOpenDelete(true);
              }}
              className={styles.password}
            >
              Delete your account
            </button>
            {openDelete && <DeleteAccount setOpenDelete={setOpenDelete} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
