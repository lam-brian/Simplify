import { useSelector } from "react-redux";
import NoteForm from "../components/Notes/NoteForm";

const NewNote = () => {
  const newNote = useSelector((state) => state.note.newNote);

  return <NoteForm summary={newNote.summary} keywords={newNote.keywords} />;
};

export default NewNote;
