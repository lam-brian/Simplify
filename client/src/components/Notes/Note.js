import { useNavigate } from "react-router-dom";
import Button from "../FormElements/Button/Button";
import { icons } from "../../images";
import styles from "./Note.module.css";

const Note = ({ title, termCount, date, id }) => {
  const navigate = useNavigate();

  const openNoteHandler = () => {
    navigate(`/notes/${id}`);
  };

  const dateObj = new Date(date);

  const dateString = dateObj.toLocaleDateString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <Button className="btn--secondary" onClick={openNoteHandler}>
        {termCount} terms
      </Button>
      <p>
        <img src={icons.calendar} alt="" />
        {dateString}
      </p>
    </div>
  );
};

export default Note;
