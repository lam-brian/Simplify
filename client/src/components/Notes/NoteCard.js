import { useState, useRef, useEffect } from "react";

import Button from "../FormElements/Button/Button";
import { ReactComponent as CloseIcon } from "../../images/icons/close-circle.svg";
import { ReactComponent as StarIcon } from "../../images/icons/star.svg";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import styles from "./NoteCard.module.css";

const NoteCard = ({ keyword, definition, index, editing, active }) => {
  const [wordDefinition, setWordDefinition] = useState(definition || "");
  const [isEditing, setIsEditing] = useState(editing);
  const textAreaRef = useRef(null);
  const cardNumber = String(index).padStart(2, "0") + ".";

  const definitionChangeHandler = (e) => {
    setWordDefinition(e.target.value);
  };

  const cancelEditingHandler = () => {
    setIsEditing(false);
    setWordDefinition(definition);
  };

  useEffect(() => {
    const currentRef = textAreaRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [wordDefinition]);

  let buttons = (
    <Button>
      <CloseIcon />
    </Button>
  );

  if (active) {
    buttons = (
      <div className={styles.actions}>
        <Button className="btn--favorite">
          <StarIcon />
        </Button>
        <Button onClick={() => setIsEditing(true)}>
          <EditIcon />
        </Button>
        <Button>
          <CloseIcon />
        </Button>
      </div>
    );
  }

  if (isEditing) {
    buttons = (
      <div className={styles.actions}>
        <Button className="btn--secondary" onClick={cancelEditingHandler}>
          Cancel
        </Button>
        <Button className="btn--primary">Save</Button>
      </div>
    );
  }

  return (
    <div className={styles.noteCard}>
      <div className={styles.header}>
        <span>{cardNumber}</span>

        {buttons}
      </div>
      <div
        className={`${styles.content} ${
          isEditing ? styles.active : styles.inactive
        }`}
      >
        <label htmlFor={keyword}>{keyword}</label>
        <textarea
          type="text"
          id={keyword}
          value={wordDefinition}
          onChange={definitionChangeHandler}
          ref={textAreaRef}
          readOnly={isEditing === undefined ? false : !isEditing}
        />
      </div>
    </div>
  );
};

export default NoteCard;
