import { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";

import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDownComponent.svg";
import { ReactComponent as ArrowUpIcon } from "../../images/icons/arrowUpComponent.svg";
import Note from "./Note";
import Button from "../FormElements/Button/Button";
import { illustrations } from "../../images";
import styles from "./Home.module.css";

const Home = ({ notes, user }) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef(null);

  const firstName =
    user.username[0].toUpperCase() + user.username.split(" ")[0].slice(1);

  const toggleShowSortOptions = () => {
    setShowSortOptions((prevState) => !prevState);
  };

  useEffect(() => {
    const currentSortRef = sortRef.current;

    function handleClickOutside(event) {
      if (currentSortRef && !currentSortRef.contains(event.target)) {
        setShowSortOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortOptions]);

  const renderedNotes = notes.map((note, i) => (
    <Note
      key={i}
      id={note.id}
      title={note.title}
      termCount={note.keywords.length}
      date={note.date}
    />
  ));

  return (
    <>
      <Helmet bodyAttributes={{ style: "background-color : #EDF3FE" }} />
      <div className={styles.banner}>
        <div className={styles.heading}>
          <h1>Welcome back, {firstName}</h1>
          <p>Let's start studying</p>
        </div>
        <div className={styles.illustration}>
          <img src={illustrations.laptop} alt="" />
        </div>
      </div>
      <div className={styles.header}>
        <h2>Your Notes</h2>
        <button className={styles["btn--sort"]} onClick={toggleShowSortOptions}>
          Sort {showSortOptions ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
        {showSortOptions && (
          <div className={styles.sortMenu} ref={sortRef}>
            <Button>Alphabetical</Button>
            <Button>Date Created</Button>
          </div>
        )}
      </div>
      <div className={styles.cardFrame}>
        {notes.length > 0 ? renderedNotes : <p>No notes found!</p>}
      </div>
    </>
  );
};

export default Home;
