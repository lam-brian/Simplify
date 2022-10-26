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
        </div>
      </div>
    </>
  );
};

export default DeleteAccount