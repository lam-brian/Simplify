import { useState } from "react";

import SummaryForm from "./SummaryForm";
import SummarizedContent from "./SummarizedContent";
import styles from "./Summary.module.css";

const DUMMY_SUMMARY = "hello word, my name is brian.";
const DUMMY_KEYWORDS = [
  {
    text: "hello",
    score: "1",
  },
  {
    text: "test",
    score: "2",
  },
];

const Summary = () => {
  const [summary, setSummary] = useState(DUMMY_SUMMARY);
  const [keywords, setKeywords] = useState(DUMMY_KEYWORDS);

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
