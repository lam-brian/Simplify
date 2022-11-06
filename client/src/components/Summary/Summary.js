import { useSelector } from "react-redux";

import SummaryForm from "./SummaryForm";
import SummarizedContent from "./SummarizedContent";
import styles from "./Summary.module.css";

const Summary = () => {
  const { summary, keywords } = useSelector(
    (state) => state.note.summarizedData
  );

  return (
    <>
      <h1 className={styles.heading}>Text Summarizer</h1>

      <SummaryForm />
      {summary && keywords.length > 0 && (
        <SummarizedContent summary={summary} keywords={keywords} />
      )}
    </>
  );
};

export default Summary;
