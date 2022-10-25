import { useState, useEffect } from "react";
import { icons } from "../../../images";
import styles from "./Accordion.module.css";

const Accordion = ({ title, children, onOpenTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openTab = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (children) setIsOpen(true);
  }, [children]);

  return (
    <div className={styles.accordion}>
      <div className={styles.tab} onClick={openTab}>
        <h2>{title}</h2>
        <img src={isOpen ? icons.arrowUp : icons.arrowDown} alt="open tab" />
      </div>
      <div
        className={
          isOpen ? `${styles.content} ${styles.active}` : styles.content
        }
      >
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Accordion;
