import { useState, useCallback } from "react";
import summarize from "../../helpers/script";

import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";

const SummaryForm = () => {
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!urlInput && !textInput) return;

    const summary = await summarize(textInput);
    console.log(summary);
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
