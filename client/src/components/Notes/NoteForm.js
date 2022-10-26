import { useState, useEffect, useRef } from "react";

import NoteCard from "./NoteCard";
import Button from "../FormElements/Button/Button";
import { icons } from "../../images";
import styles from "./NoteForm.module.css";

const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed tempora alias quis, suscipit consequuntur unde! Neque laudantium, quod, adipisci tempore rerum totam expedita nobis quidem ullam debitis officiis`;

const DUMMY_KEYWORDS = ["hello", "testing", "highlights"];

const NoteForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredSummary, setEnteredSummary] = useState(text);
  const textAreaRef = useRef(null);

  const renderedCards = DUMMY_KEYWORDS.map((word, i) => (
    <NoteCard key={i} index={i + 1} keyword={word} definition={text} />
  ));

  const titleInputHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const summaryInputHandler = (e) => {
    setEnteredSummary(e.target.value);
  };

  useEffect(() => {
    const currentRef = textAreaRef.current;

    if (currentRef) {
      currentRef.style.height = "0px";
      const scrollHeight = currentRef.scrollHeight;

      currentRef.style.height = scrollHeight + "px";
    }
  }, [enteredSummary]);

  return (
    <form className={styles.noteForm}>
      <div className={styles.heading}>
        <h1>Create a new study set</h1>
        <div className={styles.buttons}>
          <Button className="btn--secondary">Cancel</Button>
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
      >
        <img src={icons.plus} alt="" />
        Add card
      </Button>
    </form>
  );
};

export default NoteForm;
