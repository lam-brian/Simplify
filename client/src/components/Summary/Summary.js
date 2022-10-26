import { useState } from "react";

import SummaryForm from "./SummaryForm";
import SummarizedContent from "./SummarizedContent";
import styles from "./Summary.module.css";

const Summary = () => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);

  const retrieveSummaryHandler = (text) => {
    setSummary(text);
  };

  const retrieveKeywordsHandler = (wordsArray) => {
    setKeywords(wordsArray);
  };

  return (
    <>
      <h1 className={styles.heading}>Text Summarizer</h1>

      <SummaryForm
        onRetrieveSummary={retrieveSummaryHandler}
        onRetrieveKeywords={retrieveKeywordsHandler}
      />
      {summary && keywords.length > 0 && (
        <SummarizedContent summary={summary} keywords={keywords} />
      )}
    </>
  );
};

export default Summary;
