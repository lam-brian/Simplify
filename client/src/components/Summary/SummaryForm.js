import { useState, useCallback } from "react";

import Button from "../FormElements/Button/Button";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";

const SummaryForm = ({ onRetrieveSummary, onRetrieveKeywords }) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!url && !text) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, text }),
        }
      );

      if (!res.ok) {
        throw new Error("Unable to summarize, please try again!");
      }

      const { summary, keywords } = await res.json();
      onRetrieveSummary(summary);
      onRetrieveKeywords(keywords);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  const urlInputHandler = useCallback((input) => {
    setUrl(input);
  }, []);

  const textInputHandler = useCallback((input) => {
    setText(input);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <form className={styles.form} onSubmit={submitFormHandler}>
        <Input
          element="input"
          label="Paste URL"
          id="url"
          type="url"
          placeholder="Paste URL here"
          onInput={urlInputHandler}
        />
        <Input
          element="textarea"
          label="Paste text"
          id="plainText"
          type="text"
          rows="8"
          placeholder="Type or paste your text here"
          onInput={textInputHandler}
        />
        <Button type="submit" className="btn--primary">
          Summarize
        </Button>
      </form>
    </>
  );
};

export default SummaryForm;
