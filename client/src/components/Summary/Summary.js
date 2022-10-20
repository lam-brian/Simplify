import { useState } from "react";
import SummaryForm from "./SummaryForm";
import SummarizedContent from "./SummarizedContent";
import styles from "./Summary.module.css";
import Registration from "../Login/Registration";

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
      <div className={styles.heading}>
        <h1>Text Summarizer</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse eius,
          temporibus ad nisi id doloribus numquam, natus consequatur quidem
          animi excepturi? Debitis, quasi. Vero dignissimos consequatur laborum
          dolorem repellat veniam.
        </p>
      </div>
      <div className={styles.summary}>
        <SummaryForm
          onRetrieveSummary={retrieveSummaryHandler}
          onRetrieveKeywords={retrieveKeywordsHandler}
        />
        <SummarizedContent summary={summary} keywords={keywords} />
      </div>
    </>
  );
};

export default Summary;
