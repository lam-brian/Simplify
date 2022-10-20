import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Reg from "../Login/Login";
import { useState } from "react";
const SummarizedContent = ({ summary }) => {

  const [ modal, setModal ] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  return (
    <div className={styles.content}>
      <div className={styles.paragraph}>
        <h2>Paragraph</h2>
        <p>{summary}</p>
      </div>
      <div className={styles.keywords}>
        <h2>Key Highlights</h2>
        <div className={styles.tags}>
          <button>Hello</button>
          <button>Hello</button>
          <button>Hello</button>
          <button>amazing</button>
          <button>testing</button>
          <button>highlighting</button>
        </div>
      </div>
      <Button onClick={toggleModal} className="btn--primary">Save notes</Button>
      
      {modal && (
        <Reg />
      )}

    </div>
  );
};

export default SummarizedContent;
