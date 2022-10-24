import { useState } from "react";

import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Reg from "../Login/Login";

const SummarizedContent = ({ summary, keywords }) => {
  const renderedKeywords = keywords.map((keyword) => (
    <Button key={keyword.score}>{keyword.text}</Button>
  ));

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className={styles.content}>
      <div className={styles.paragraph}>
        <h2>Paragraph</h2>
        <p>{summary}</p>
      </div>
      <div className={styles.keywords}>
        <h2>Key Highlights</h2>
        <div className={styles.tags}>{renderedKeywords}</div>
      </div>
      <Button onClick={toggleModal} className="btn--primary">
        Save notes
      </Button>

      {modal && <Reg />}
    </div>
  );
};

export default SummarizedContent;
