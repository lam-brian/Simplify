import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { noteActions } from "../../store/note-slice";
import { icons } from "../../images";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDownComponent.svg";
import { ReactComponent as ArrowUpIcon } from "../../images/icons/arrowUpComponent.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import NoteCard from "./NoteCard";
import Modal from "../UI/Modal/Modal";
import Button from "../FormElements/Button/Button";
import styles from "./SelectedNote.module.css";

const SelectedNote = ({ title, summary, keywords, id }) => {
  const dispatch = useDispatch();
  const [highlights, setHighlights] = useState(keywords);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const settingsRef = useRef(null);
  const sortRef = useRef(null);

  const showSettingsHandler = () => {
    setShowSettings(true);
  };

  const hideSettingsHandler = () => {
    setShowSettings(false);
  };

  const openDeleteModalHandler = () => {
    setShowSettings(false);
    setShowDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const toggleShowSortOptions = () => {
    setShowSortOptions((prevState) => !prevState);
  };

  const editKeywordHandler = (i, word) => {
    const words = [...highlights];
    const oldWord = words[i];

    words[i] = {
      word,
      score: oldWord.score,
      definition: oldWord.definition,
    };

    setHighlights(words);
  };

  const editDefinitionHandler = (i, definition) => {
    const words = [...highlights];
    const oldWord = words[i];

    words[i] = {
      word: oldWord.word,
      score: oldWord.score,
      definition,
    };

    setHighlights(words);
  };

  const deleteKeywordHandler = (i) => {
    console.log(i);
    // const words = [...highlights];
    // words.splice(i, 1);
    // setHighlights(words);
  };

  useEffect(() => {
    const currentSettingsRef = settingsRef.current;

    function handleClickOutside(event) {
      if (currentSettingsRef && !currentSettingsRef.contains(event.target)) {
        hideSettingsHandler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

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

  useEffect(() => {
    dispatch(noteActions.enterNote());

    return () => {
      dispatch(noteActions.exitNote());
    };
  }, [dispatch]);

  const renderedCards = keywords.map((word, i) => (
    <NoteCard
      active={true}
      key={i}
      index={i}
      keyword={word.word}
      definition={word.definition}
      editing={false}
      onDelete={deleteKeywordHandler}
      onEditKeyword={editKeywordHandler}
      onEditDefinition={editDefinitionHandler}
    />
  ));

  return (
    <>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModalHandler}
        header="Delete this study set"
        footer={
          <>
            <Button className="btn--primary" onClick={closeDeleteModalHandler}>
              Cancel
            </Button>
            <Button
              className="btn--primary"
              style={{ backgroundColor: "#DD4D42" }}
            >
              Delete study set
            </Button>
          </>
        }
      >
        <p>
          You are about to delete this study set and will never be able to
          retrieve the data again.
        </p>
      </Modal>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <Button onClick={showSettingsHandler}>
          <img src={icons.settings} alt="settings" />
        </Button>
        {showSettings && (
          <div className={styles.dropdown} ref={settingsRef}>
            <Button onClick={openDeleteModalHandler}>
              <TrashIcon /> Delete set
            </Button>
          </div>
        )}
      </div>

      <div className={styles.summary}>
        <h2>Summary</h2>
        <p>{summary}</p>
      </div>

      <fieldset className={styles.highlights}>
        <div className={styles.subHeading}>
          <legend>Key Highlights</legend>
          <button
            className={styles["btn--sort"]}
            onClick={toggleShowSortOptions}
          >
            Sort {showSortOptions ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
          {showSortOptions && (
            <div className={styles.sortMenu} ref={sortRef}>
              <div>
                <label htmlFor="alphabetical">alphabetical</label>
                <input type="checkbox" id="alphabetical" />
              </div>
              <div>
                <label htmlFor="starred">Starred</label>
                <input type="checkbox" id="starred" />
              </div>
            </div>
          )}
        </div>
        <div className={styles.cards}>{renderedCards}</div>
      </fieldset>

      <Button
        className="btn--light"
        style={{ fontFamily: "Lora, serif", width: "100%" }}
      >
        <img src={icons.plus} alt="" />
        Add card
      </Button>
    </>
  );
};

export default SelectedNote;
