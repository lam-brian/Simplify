import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import { icons } from "../../images";
import styles from "./DeleteAccount.module.css";
import Button from "../FormElements/Button/Button";

const DeleteAccount = ({ show, onCancel, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    onSubmit();
    setInputValue("");
  };

  return (
    <Modal
      show={show}
      onCancel={onCancel}
      onSubmit={deleteAccountHandler}
      className="delete"
      header="Delete account"
      footer={
        <>
          <p className={styles.confirmationMessage}>
            To confirm this, type “<span>DELETE</span>”
          </p>
          <div className={styles.input}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="btn--primary"
              type="submit"
              style={{ backgroundColor: "var(--state-red)" }}
              disabled={inputValue !== "DELETE"}
            >
              Delete
            </Button>
          </div>
        </>
      }
    >
      <p>
        Are you sure you want to delete the account linked to
        josephsmith@gmail.com. You will not be able to undo.
      </p>
      <button className={styles.close} onClick={onCancel} type="button">
        <img src={icons.closeCircle} alt="close modal" />
      </button>
    </Modal>
  );
};

export default DeleteAccount;
