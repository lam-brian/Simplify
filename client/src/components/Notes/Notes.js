import styles from "./Notes.module.css";

const Notes = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}>Psychology Notes</div>
        <button className={styles.button}>22 terms</button>
      </div>
    </>
  );
};

export default Notes;
