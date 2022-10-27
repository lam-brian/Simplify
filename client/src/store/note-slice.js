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
      const { title, summary, keywords } = action.payload;

      const note = {
        title,
        summary,
        keywords,
        date: new Date().toISOString(),
      };
      state.notes.push(note);
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
  return (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3001/api/notes/newNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      const data = await response.json();

      console.log(data);
    };

    sendRequest();
  };
};

export default noteSlice;
