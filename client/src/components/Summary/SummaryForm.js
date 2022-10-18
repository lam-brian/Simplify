import { useState, useCallback } from "react";

import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";

const SummaryForm = () => {
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!urlInput && !textInput) return;

    const res = await fetch("http://localhos:3001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textInput),
    });

    const data = await res.json();

    console.log(data);
  };

  const urlInputHandler = useCallback((input) => {
    setUrlInput(input);
  }, []);

  const textInputHandler = useCallback((input) => {
    setTextInput(input);
  }, []);

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <Input
        element="input"
        label="Paste URL"
        id="url"
        type="url"
        onInput={urlInputHandler}
      />
      <div className={styles.divider}>or</div>
      <Input
        element="textarea"
        label="Paste text"
        id="plainText"
        type="text"
        rows="10"
        onInput={textInputHandler}
      />
      <Button type="submit" className="btn--primary">
        Summarize
      </Button>
    </form>
  );
};

export default SummaryForm;
