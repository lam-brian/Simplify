import { useState, useRef, useEffect } from "react";

import Button from "../FormElements/Button/Button";
import { ReactComponent as CloseIcon } from "../../images/icons/closeCircleComponent.svg";
import { ReactComponent as StarIcon } from "../../images/icons/star.svg";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import styles from "./NoteCard.module.css";

const NoteCard = ({
  keyword,
  definition,
  index,
  editing,
  active,
  onDelete,
  onEditKeyword,
  onEditDefinition,
  onStarKeyword,
  isStarred,
}) => {
  const [highlight, setHighlight] = useState(keyword || "");
  const [wordDefinition, setWordDefinition] = useState(definition || "");
  const [isEditing, setIsEditing] = useState(editing);
  const definitionRef = useRef(null);
  const keywordRef = useRef(null);
  const cardNumber = String(index + 1).padStart(2, "0") + ".";

  const highlightChangeHandler = (e) => {
    setHighlight(e.target.value);
    onEditKeyword(index, e.target.value);
  };

  const definitionChangeHandler = (e) => {
    setWordDefinition(e.target.value);
    onEditDefinition(index, e.target.value);
  };

  useEffect(() => {
    setHighlight(keyword);
    setWordDefinition(definition);
  }, [highlight, definition, keyword]);

  useEffect(() => {
    const currentKeywordRef = keywordRef.current;
    const currentDefinitionRef = definitionRef.current;

    function handleClickOutside(event) {
      if (
        currentDefinitionRef &&
        !currentDefinitionRef.contains(event.target) &&
        currentKeywordRef &&
        !currentKeywordRef.contains(event.target)
      ) {
        setIsEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wordDefinition]);

  useEffect(() => {
    const currentRef = keywordRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [highlight]);

  useEffect(() => {
    const currentRef = definitionRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [wordDefinition]);

  let buttons = (
    <Button onClick={onDelete.bind(null, index)}>
      <CloseIcon />
    </Button>
  );

  if (active) {
    buttons = (
      <div className={styles.actions}>
        <Button
          className={isStarred ? "btn--favorite-active" : "btn--favorite"}
          onClick={onStarKeyword.bind(null, index)}
        >
          <StarIcon />
        </Button>
        <Button
          onClick={() => setIsEditing(true)}
          className={isEditing ? "active" : ""}
        >
          <EditIcon />
        </Button>
        <Button onClick={onDelete.bind(null, index)}>
          <CloseIcon />
        </Button>
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
        <textarea
          className={styles.keyword}
          value={highlight}
          onChange={highlightChangeHandler}
          ref={keywordRef}
          readOnly={editing !== undefined ? !isEditing : false}
          placeholder="Enter a keyword"
        />

        <textarea
          className={styles.definition}
          value={wordDefinition}
          onChange={definitionChangeHandler}
          ref={definitionRef}
          readOnly={editing !== undefined ? !isEditing : false}
          placeholder="Enter a description"
        />
      </div>
    </div>
  );
};

export default NoteCard;
