import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";
import { summarizeData } from "../../store/note-slice";

const SummaryForm = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!url && !text) return;

    dispatch(summarizeData(url, text));
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <Input
        element="input"
        label="Paste URL"
        id="url"
        type="url"
        placeholder="Paste URL here"
        onInput={setUrl}
        value={url}
      />
      <div className={styles.divider}>or</div>
      <Input
        element="textarea"
        label="Paste text"
        id="plainText"
        type="text"
        rows="8"
        placeholder="Type or paste your text here"
        onInput={setText}
        value={text}
      />
      <Button type="submit" className="btn--primary">
        Summarize
      </Button>
    </form>
  );
};

export default SummaryForm;
