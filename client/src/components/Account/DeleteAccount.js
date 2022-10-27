import styles from "./DeleteAccount.module.css";
import Vector from "../../images/icons/close-circle.svg";
const DeleteAccount = ({ setOpenDelete }) => {
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.close}
          onClick={() => {
            setOpenDelete(false);
          }}
        >
          <img className={styles.vector} src={Vector} alt="" />
        </button>

        <div className={styles.account}>Delete account</div>
        <div className={styles.warning}>
          Are you sure you want to delete the account linked to
          josephsmith@gmail.com. You will not be able to undo.
        </div>
        <div className={styles.confirm}>To confirm this, type “DELETE”</div>
        <form>
          <input className={styles.input} />
          <button className={styles.delete}>Delete</button>
        </form>
      </div>
    </>
  );
};

export default DeleteAccount;
