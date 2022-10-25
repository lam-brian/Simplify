import { useState, useCallback } from "react";

import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";

const SummaryForm = ({ onRetrieveSummary, onRetrieveKeywords }) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!url && !text) return;

    try {
      const res = await fetch("http://localhost:3001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, text }),
      });

      console.log(res);

      if (!res.ok) {
        throw new Error("Unable to summarize");
      }

      const { summary, keywords } = await res.json();
      onRetrieveSummary(summary);
      onRetrieveKeywords(keywords);
    } catch (err) {
      console.log(err);
    }
  };

  const urlInputHandler = useCallback((input) => {
    setUrl(input);
  }, []);

  const textInputHandler = useCallback((input) => {
    setText(input);
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
