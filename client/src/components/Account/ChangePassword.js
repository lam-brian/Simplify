import styles from "./ChangePassword.module.css";
import Vector from "../../images/icons/close-circle.svg";
const ChangePassword = ({ setOpenModal }) => {
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.close}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <img className={styles.vector} src={Vector} alt="" />
        </button>
        <h1>Change your password</h1>
        <form>
          <div className={styles.label}>Current password</div>
          <input type="password" className={styles.input} />
          <div className={styles.label}>New password</div>
          <input type="password" className={styles.input} />
          <div className={styles.label}>Repeat new password</div>
          <input type="password" className={styles.input} />
          <button
            className={styles.delete}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Set new password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
