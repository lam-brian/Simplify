import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../store/note-slice";
import { uiActions } from "../../store/ui-slice";

import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Accordion from "../UI/Accordion/Accordion";

const SummarizedContent = ({ summary, keywords }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [isClicked, setIsClicked] = useState(false);

  const renderedKeywords = keywords.map((keyword) => (
    <div key={keyword.text}>{keyword.text}</div>
  ));

  useEffect(() => {
    if (isLoggedIn && isClicked) {
      dispatch(noteActions.saveNote({ summary, keywords }));
      navigate("/new-note");
    }
  }, [isLoggedIn, isClicked, navigate, dispatch, summary, keywords]);

  const saveNotesHandler = () => {
    setIsClicked(true);

    if (!isLoggedIn) {
      dispatch(uiActions.openLoginModal("login"));
    }
  };

  return (
    <div>
      <div className={styles.content}>
        <Accordion title="Summary">
          <p>{summary}</p>
        </Accordion>
        <Accordion title="Key Highlights">
          <div className={styles.tags}>{renderedKeywords}</div>
        </Accordion>
      </div>

      <Button
        className="btn--primary"
        style={{ width: "100%" }}
        onClick={saveNotesHandler}
      >
        Save notes
      </Button>
    </div>
  );
};

export default SummarizedContent;
