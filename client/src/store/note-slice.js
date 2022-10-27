import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    isNoteMode: false,
    newNote: {},
    notes: [],
  },
  reducers: {
    enterNote(state) {
      state.isNoteMode = true;
    },
    exitNote(state) {
      state.isNoteMode = false;
    },
    saveNote(state, action) {
      const words = [...action.payload.keywords];
      const newKeywords = words.map((word) => ({
        word: word.text,
        definition: "",
        score: word.score,
      }));

      const note = {
        summary: action.payload.summary,
        keywords: newKeywords,
      };

      state.newNote = note;
    },
    addNote(state, action) {
      const { title, summary, highlights: keywords, id, date } = action.payload;

      const note = {
        title,
        summary,
        keywords,
        id,
        date,
      };
      state.notes.push(note);
    },
    retrieveNotes(state, action) {
      if (state.notes.length === 0) {
        const fetchedNotes = action.payload;

        const newNotes = fetchedNotes.map((note) => ({
          title: note.title,
          summary: note.summary,
          keywords: note.highlights,
          id: note.id,
          date: note.date,
        }));

        state.notes = newNotes;
      }
    },
    updateNote(state, action) {
      const note = state.notes.find((note) => note.id === action.payload.id);

      note.keywords = action.payload.keywords;
    },
    deleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const noteActions = noteSlice.actions;

export const saveNoteToDB = (note) => {
  return async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/newNote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      }
    );

    const data = await response.json();

    dispatch(noteActions.addNote(data));
  };
};

export const fetchNotes = (uid) => {
  return async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/notes/${uid}`
    );

    const data = await response.json();

    dispatch(noteActions.retrieveNotes(data.notes));
  };
};

export default noteSlice;
