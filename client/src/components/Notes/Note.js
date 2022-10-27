import { useNavigate } from "react-router-dom";
import Button from "../FormElements/Button/Button";
import { icons } from "../../images";
import styles from "./Note.module.css";

const Note = ({ title, termCount, date, id }) => {
  const navigate = useNavigate();

  const openNoteHandler = () => {
    navigate(`/notes/${id}`);
  };

  return (
    <div className={styles.card}>
      <h3>{"title"}</h3>
      <Button className="btn--secondary" onClick={openNoteHandler}>
        {22} terms
      </Button>
      <p>
        <img src={icons.calendar} alt="" />
        October 19, 2022
      </p>
    </div>
  );
};

export default Note;
