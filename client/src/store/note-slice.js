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
      state.notes.push(action.payload);
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
