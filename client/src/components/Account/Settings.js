import styles from "./Settings.module.css";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { useState } from "react";

const Settings = () => {
  const [modalOpen, setModalOpen] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false)
  return (
    <>
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
              value="John Smith"
              className={styles.input}
            />
            <div className={styles.label}>Email</div>
            <input
              id="email"
              value="johnsmith@gmail.com"
              className={styles.input}
            />
            <div className={styles.label}>Password</div>
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className={styles.button}
            >
              Change Password
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
