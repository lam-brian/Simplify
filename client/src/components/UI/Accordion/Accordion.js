import { useState } from "react";
import { icons } from "../../../images";
import styles from "./Accordion.module.css";

const Accordion = ({ title, children, onOpenTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleTab = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.tab} onClick={toggleTab}>
        <h2>{title}</h2>
        <img src={isOpen ? icons.arrowUp : icons.arrowDown} alt="open tab" />
      </div>
      <div
        className={
          isOpen ? `${styles.content} ${styles.active}` : styles.content
        }
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
