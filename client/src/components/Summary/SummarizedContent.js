import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../FormElements/Button/Button";
import styles from "./SummarizedContent.module.css";
import Registration from "../Login/Registration";
import Accordion from "../UI/Accordion/Accordion";
import { noteActions } from "../../store/note-slice";

const SummarizedContent = ({ summary, keywords }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const renderedKeywords = keywords.map((keyword) => (
    <Button key={keyword.score}>{keyword.text}</Button>
  ));

  useEffect(() => {
    if (isLoggedIn && isClicked) {
      dispatch(noteActions.saveNote({ summary, keywords }));
      navigate("/new-note");
    }
  }, [isLoggedIn, isClicked, navigate, dispatch, summary, keywords]);

  const openNotesHandler = () => {
    setIsClicked(true);

    if (!isLoggedIn) {
      setModalOpen(true);
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
        onClick={openNotesHandler}
      >
        Save notes
      </Button>

      {modalOpen && <Registration setOpenModal={setModalOpen} />}
    </div>
  );
};

export default SummarizedContent;
