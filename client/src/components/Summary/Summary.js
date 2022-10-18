import SummaryForm from "./SummaryForm";
import SummarizedContent from "./SummarizedContent";
import styles from "./Summary.module.css";

const Summary = () => {
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
        <SummaryForm />
        <SummarizedContent />
      </div>
    </>
  );
};

export default Summary;
