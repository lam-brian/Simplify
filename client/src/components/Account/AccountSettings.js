import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../store/login-slice";

import styles from "./AccountSettings.module.css";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import Button from "../FormElements/Button/Button";

const AccountSettings = ({ username, email, id }) => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteAccountHandler = () => {
    dispatch(deleteAccount(id));
  };

  return (
    <>
      <DeleteAccount
        show={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onSubmit={deleteAccountHandler}
      />
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
            <Button className="btn--secondary">Change password</Button>
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
    </>
  );
};

export default AccountSettings;
