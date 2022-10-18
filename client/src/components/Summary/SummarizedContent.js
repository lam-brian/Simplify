import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";

const SummarizedContent = () => {
  return (
    <div className={styles.content}>
      <div className={styles.paragraph}>
        <h2>Paragraph</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ducimus
          nostrum incidunt? Accusamus enim quis nobis molestiae non ullam ea qui
          a tempora beatae inventore error commodi, sequi ipsum officiis. Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Officiis laudantium
          voluptatibus autem ex ad, dicta minus quo exercitationem rerum laborum
          vitae unde? Nulla ipsa repudiandae excepturi velit nihil magni non.
        </p>
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
      <Button className="btn--primary">Save notes</Button>
    </div>
  );
};

export default SummarizedContent;
