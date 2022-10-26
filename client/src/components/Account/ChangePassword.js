import styles from "./ChangePassword.module.css"
import Vector from "../../images/icons/close-circle.svg"
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
        <div className={styles.label}>Current Password</div>
        <input type="password" className={styles.input} />
        <div className={styles.label}>New Password</div>
        <input type="password" className={styles.input} />
        <div className={styles.label}>Repeat New Password</div>
        <input type="password" className={styles.input} />
        <button
          className={styles.delete}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Set new password
        </button>
      </div>
    </>
  );
};

export default ChangePassword