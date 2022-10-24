import { useState } from "react";

import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Registration from "../Login/Registration";

const SummarizedContent = ({ summary, keywords }) => {
  const renderedKeywords = keywords.map((keyword) => (
    <Button key={keyword.score}>{keyword.text}</Button>
  ));

  const [modalOpen, setModalOpen] = useState(false);

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
      <Button
        className="btn--primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Save notes
      </Button>

      {modalOpen && <Registration setOpenModal={setModalOpen} />}
    </div>
  );
};

export default SummarizedContent;
