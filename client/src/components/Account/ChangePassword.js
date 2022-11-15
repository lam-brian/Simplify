import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Input from "../FormElements/Input/Input";
import Button from "../FormElements/Button/Button";
import styles from "./ChangePassword.module.css";
import { icons } from "../../images";

const ChangePassword = ({ show, onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const isDisabled = !currentPassword || !newPassword || !repeatedPassword;

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatedPassword) {
      alert("Repeated password does not match new password");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/reset-password`,
        {
          method: "put",
          body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again!"
        );
      }

      alert(data.message);
      onCancel();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Modal
      show={show}
      onCancel={onCancel}
      onSubmit={changePasswordHandler}
      header="Change your password"
      className="password"
      footer={
        <>
          <Button className="btn--secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="btn--primary" type="submit" disabled={isDisabled}>
            Set new password
          </Button>
        </>
      }
    >
      <>
        <Input
          element="input"
          label="Current password"
          id="current-password"
          type="password"
          onInput={setCurrentPassword}
        />
        <Input
          element="input"
          label="New password"
          id="new-password"
          type="password"
          minLength={9}
          onInput={setNewPassword}
        />
        <Input
          element="input"
          label="Repeat new password"
          id="new-password-repeat"
          type="password"
          onInput={setRepeatedPassword}
        />
        <button className={styles.close} onClick={onCancel} type="button">
          <img src={icons.closeCircle} alt="close form" />
        </button>
      </>
    </Modal>
  );
};

export default ChangePassword;
