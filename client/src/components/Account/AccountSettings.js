import { useState } from "react";

import styles from "./AccountSettings.module.css";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import Button from "../FormElements/Button/Button";

const AccountSettings = ({ username, email }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <h1 className={styles.heading}>Account Settings</h1>
      <div className={styles.container}>
        <div className={styles.avatar}>{username[0].toUpperCase()}</div>
        <div className={styles.content}>
          <div className={styles.profileDetails}>
            <h2>Profile Details</h2>
            <div>
              <h3>Full name</h3>
              <p>{username}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{email}</p>
            </div>
            <Button
              className="btn--secondary"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change password
            </Button>
          </div>
          <div>
            <h2>Close account</h2>
            <Button
              className="btn--danger"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete your account
            </Button>
          </div>
        </div>
      </div>
      <ChangePassword
        show={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
      />
      <DeleteAccount
        show={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default AccountSettings;
