import { useState, useRef, useEffect } from "react";

import Button from "../FormElements/Button/Button";
import { ReactComponent as CloseIcon } from "../../images/icons/close-circle.svg";
import styles from "./NoteCard.module.css";

const NoteCard = ({ keyword, definition, index }) => {
  const [wordDefinition, setWordDefinition] = useState(definition || "");
  const textAreaRef = useRef(null);
  const cardNumber = String(index).padStart(2, "0") + ".";

  const definitionChangeHandler = (e) => {
    setWordDefinition(e.target.value);
  };

  useEffect(() => {
    const currentRef = textAreaRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [wordDefinition]);

  return (
    <div className={styles.noteCard}>
      <div className={styles.header}>
        <span>{cardNumber}</span>
        <Button>
          <CloseIcon />
        </Button>
      </div>
      <div className={styles.content}>
        <label htmlFor={keyword}>{keyword}</label>
        <textarea
          type="text"
          id={keyword}
          value={wordDefinition}
          onChange={definitionChangeHandler}
          ref={textAreaRef}
        />
      </div>
    </div>
  );
};

export default NoteCard;
