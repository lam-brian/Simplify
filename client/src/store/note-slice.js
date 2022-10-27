import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    isNoteMode: false,
    newNote: {},
    notes: [
      {
        title: "test",
        summary: "hello worlds",
        keywords: [{ word: "text", score: "23", definition: "testing23" }],
        date: "2022-10-27T05:21:38.841Z",
        id: "1",
      },
    ],
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
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
