import { useState } from "react";

import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Registration from "../Login/Registration";
import Accordion from "../UI/Accordion/Accordion";

const SummarizedContent = ({ summary, keywords }) => {
  const renderedKeywords = keywords.map((keyword) => (
    <Button key={keyword.score}>{keyword.text}</Button>
  ));

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.content}>
        <Accordion title="Summary">
          <p>{summary}</p>
        </Accordion>
        <Accordion title="Key Highlights">
          <div className={styles.tags}>{renderedKeywords}</div>
        </Accordion>
      </div>

      <Button
        className="btn--primary"
        style={{ width: "100%" }}
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
