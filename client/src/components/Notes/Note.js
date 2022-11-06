import { useNavigate } from "react-router-dom";
import styles from "./Note.module.css";

const Note = ({ title, termCount, date, id }) => {
  const navigate = useNavigate();

  const openNoteHandler = () => {
    navigate(`/notes/${id}`);
  };

  // const dateObj = new Date(date);

  // const dateString = dateObj.toLocaleDateString("default", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });

  return (
    <button className={styles.card} onClick={openNoteHandler}>
      <h3>{title}</h3>
      <div>{termCount} terms</div>
    </button>
  );
};

export default Note;
