import styles from "./DeleteAccount.module.css"
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
        <div className={styles.heading}>
          <h2>Delete Account</h2>
          <h6>
            Are you sure you want to delete the account linked to
            josephsmith@gmail.com? You will not be able to undo.
          </h6>
          <h7>To confirm this type "<span>DELETE</span>"</h7>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount