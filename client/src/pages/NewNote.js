import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NoteForm from "../components/Notes/NoteForm";

const NewNote = () => {
  const newNote = useSelector((state) => state.note.newNote);

  if (!newNote.summary && (!newNote.keywords || !newNote.keywords.length)) {
    return <Navigate replace to="/" />;
  }

  return <NoteForm summary={newNote.summary} keywords={newNote.keywords} />;
};

export default NewNote;
