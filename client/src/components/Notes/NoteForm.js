import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import NoteCard from "./NoteCard";
import Button from "../FormElements/Button/Button";
import { icons } from "../../images";
import styles from "./NoteForm.module.css";
import { noteActions, saveNoteToDB } from "../../store/note-slice";

const NoteForm = ({ summary, keywords }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredSummary, setEnteredSummary] = useState(summary);
  const [highlights, setHighlights] = useState(keywords);
  const textAreaRef = useRef(null);

  const titleInputHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const summaryInputHandler = (e) => {
    setEnteredSummary(e.target.value);
  };

  const editKeywordHandler = (i, word) => {
    const words = [...highlights];
    const oldWord = words[i];

    words[i] = {
      word,
      score: oldWord.score,
      definition: oldWord.definition,
    };

    setHighlights(words);
  };

  const editDefinitionHandler = (i, definition) => {
    const words = [...highlights];
    const oldWord = words[i];

    words[i] = {
      word: oldWord.word,
      score: oldWord.score,
      definition,
    };

    setHighlights(words);
  };

  const addNewCardHandler = () => {
    const words = [...highlights];
    const newWord = { word: "", definition: "", score: null };
    words.push(newWord);
    setHighlights(words);
  };

  const deleteKeywordHandler = (i) => {
    const words = [...highlights];
    words.splice(i, 1);
    setHighlights(words);
  };

  const cancelFormHandler = () => {
    navigate("/summarize");
    dispatch(noteActions.saveNote({ summary: "", keywords: [] }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    let keywordsIsValid = true;

    if (highlights.some((word) => word.word === "" || word.definition === "")) {
      keywordsIsValid = false;
    }

    if (!enteredTitle || !summary || !keywordsIsValid) {
      alert("Please fill in all inputs");
      return;
    }

    const note = {
      title: enteredTitle,
      summary: enteredSummary,
      highlights,
      date: new Date().toISOString(),
    };

    dispatch(saveNoteToDB(note));
    navigate("/");
  };

  useEffect(() => {
    dispatch(noteActions.enterNote());

    return () => {
      dispatch(noteActions.exitNote());
    };
  }, [dispatch]);

  useEffect(() => {
    const currentRef = textAreaRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [enteredSummary]);

  const renderedCards = highlights.map((word, i) => (
    <NoteCard
      key={word.score}
      index={i}
      keyword={word.word}
      onDelete={deleteKeywordHandler}
      onEditKeyword={editKeywordHandler}
      onEditDefinition={editDefinitionHandler}
    />
  ));

  return (
    <form className={styles.noteForm} onSubmit={submitFormHandler}>
      <div className={styles.heading}>
        <h1>Create a new study set</h1>
        <div className={styles.buttons}>
          <Button className="btn--secondary" onClick={cancelFormHandler}>
            Cancel
          </Button>
          <Button className="btn--primary" type="submit">
            Create set
          </Button>
        </div>
      </div>
      <div className={`${styles.formInputs} ${styles.title}`}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={titleInputHandler}
          value={enteredTitle}
        />
      </div>
      <div className={`${styles.formInputs} ${styles.summary}`}>
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          placeholder="Add your summary"
          onChange={summaryInputHandler}
          value={enteredSummary}
          ref={textAreaRef}
        />
      </div>

      <fieldset className={styles.highlights}>
        <legend>Key Highlights</legend>
        <div className={styles.cards}>{renderedCards}</div>
      </fieldset>

      <Button
        className="btn--light"
        style={{ fontFamily: "Lora, serif", width: "100%" }}
        onClick={addNewCardHandler}
      >
        <img src={icons.plus} alt="" />
        Add card
      </Button>
    </form>
  );
};

export default NoteForm;
