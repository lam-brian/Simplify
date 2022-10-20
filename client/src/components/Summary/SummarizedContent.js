import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";

const SummarizedContent = ({ summary, keywords }) => {
  const renderedKeywords = keywords.map((keyword) => (
    <button key={keyword.score}>{keyword.text}</button>
  ));
  console.log(keywords);
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
      <Button className="btn--primary">Save notes</Button>
    </div>
  );
};

export default SummarizedContent;
