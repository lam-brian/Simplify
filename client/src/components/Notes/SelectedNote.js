import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { noteActions, deleteNote, patchNote } from "../../store/note-slice";
import { icons } from "../../images";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDownComponent.svg";
import { ReactComponent as ArrowUpIcon } from "../../images/icons/arrowUpComponent.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash.svg";
import NoteCard from "./NoteCard";
import Modal from "../UI/Modal/Modal";
import Button from "../FormElements/Button/Button";
import styles from "./SelectedNote.module.css";

const SelectedNote = ({ title, summary, keywords, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [highlights, setHighlights] = useState(keywords);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [newCardIndex, setNewCardIndex] = useState(undefined);
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

  const cancelChangesHandler = () => {
    setHighlights(keywords);
  };

  const saveChangesHandler = () => {
    if (
      highlights.some(
        (word) => word.word.trim() === "" || word.definition.trim() === ""
      )
    ) {
      alert("Please fill in all inputs");
      return;
    }

    dispatch(patchNote(id, highlights));
  };

  const deleteStudySetHandler = () => {
    dispatch(deleteNote(id));
    navigate("/");
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
    const words = [...highlights];
    words.splice(i, 1);
    setHighlights(words);
  };

  const addNewCardHandler = () => {
    const words = [...highlights];
    const newWord = {
      word: "",
      definition: "",
      score: Math.random().toString(),
    };
    words.push(newWord);
    setHighlights(words);
    setNewCardIndex(words.length);
  };

  useEffect(() => {
    const originalKeywords = keywords;

    if (originalKeywords.length !== highlights.length) {
      return setIsChanged(true);
    }

    for (let i = 0; i < originalKeywords.length; i++) {
      const originalKeys = originalKeywords[i];
      const newKeys = highlights[i];

      if (
        originalKeys.word !== newKeys.word ||
        originalKeys.definition !== newKeys.definition
      ) {
        return setIsChanged(true);
      } else setIsChanged(false);
    }
  }, [keywords, highlights]);

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

  const renderedCards = highlights.map((word, i) => {
    return (
      <NoteCard
        active={true}
        key={word.score}
        index={i}
        keyword={word.word}
        definition={word.definition}
        editing={i === newCardIndex - 1}
        onDelete={deleteKeywordHandler}
        onEditKeyword={editKeywordHandler}
        onEditDefinition={editDefinitionHandler}
      />
    );
  });

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
              onClick={deleteStudySetHandler}
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
        onClick={addNewCardHandler}
      >
        <img src={icons.plus} alt="" />
        Add card
      </Button>
      {isChanged && (
        <div className={styles.actions}>
          <Button className="btn--secondary" onClick={cancelChangesHandler}>
            Cancel
          </Button>
          <Button className="btn--primary" onClick={saveChangesHandler}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectedNote;
