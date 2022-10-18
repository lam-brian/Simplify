import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import styles from "./SummaryForm.module.css";

const SummaryForm = () => {
  return (
    <form className={styles.form}>
      <Input element="input" label="Paste URL" id="url" type="url" />
      <div className={styles.divider}>or</div>
      <Input
        element="textarea"
        label="Paste text"
        id="plainText"
        type="text"
        rows="10"
      />
      <Button type="submit" className="btn--primary">
        Summarize
      </Button>
    </form>
  );
};

export default SummaryForm;
