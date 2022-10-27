import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectedNote from "../components/Notes/SelectedNote";

const ActiveNote = () => {
  const params = useParams();
  const { noteId } = params;

  const notes = useSelector((state) => state.note.notes);

  const currentNote = notes.find((note) => note.id === +noteId);

  return (
    <SelectedNote
      title={currentNote.title}
      summary={currentNote.summary}
      keywords={currentNote.keywords}
      id={currentNote.id}
    />
  );
};

export default ActiveNote;
