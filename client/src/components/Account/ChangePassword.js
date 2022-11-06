import Modal from "../UI/Modal/Modal";
import Input from "../FormElements/Input/Input";
import Button from "../FormElements/Button/Button";
import styles from "./ChangePassword.module.css";
import { icons } from "../../images";

const ChangePassword = ({ show, onCancel, onSubmit }) => {
  return (
    <Modal
      show={show}
      onCancel={onCancel}
      header="Change your password"
      className="password"
      footer={
        <>
          <Button className="btn--secondary">Cancel</Button>
          <Button className="btn--primary" type="submit">
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
          type="text"
        />
        <Input
          element="input"
          label="New password"
          id="new-password"
          type="text"
          minLength={9}
        />
        <Input
          element="input"
          label="Repeat new password"
          id="new-password-repeat"
          type="text"
        />
        <button className={styles.close} onClick={onCancel} type="button">
          <img src={icons.closeCircle} alt="close form" />
        </button>
      </>
    </Modal>
  );
};

export default ChangePassword;
