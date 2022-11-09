import { createSlice } from "@reduxjs/toolkit";
import { loginActions } from "./login-slice";
import { uiActions } from "./ui-slice";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    summarizedData: {},
    newNote: {},
    notes: [],
  },
  reducers: {
    summarize(state, action) {
      state.summarizedData = action.payload;
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
      note.title = action.payload.title;
      note.summary = action.payload.summary;
    },
    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    clearNotes(state) {
      state.notes = [];
    },
  },
});

export const noteActions = noteSlice.actions;

export const summarizeData = (url, text) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, text }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to summarize, please try again!");
      }

      const { summary, keywords } = await response.json();
      dispatch(noteActions.summarize({ summary, keywords }));
      dispatch(uiActions.setIsLoading(false));
    } catch (err) {
      dispatch(uiActions.setIsLoading(false));
      alert(err);
    }
  };
};

export const saveNoteToDB = (note) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/notes/newNote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(note),
        }
      );

      if (!response.ok) throw new Error("Error saving notes");

      const data = await response.json();
      dispatch(noteActions.addNote(data));
    } catch (err) {
      alert(err);
    }
  };
};

export const fetchNotes = (loggedIn) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notes`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      const { name, email, notes } = data;

      if (!loggedIn) {
        dispatch(loginActions.login({ name, email }));
      }

      dispatch(noteActions.retrieveNotes(notes));
    } catch (err) {
      alert(err);
    }
  };
};

export const deleteNote = (nid) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/notes/${nid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error deleting note");

      dispatch(noteActions.removeNote(nid));
    } catch (err) {
      alert(err);
    }
  };
};

export const patchNote = (nid, highlights, title, summary) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/notes/${nid}`,
        {
          method: "PATCH",
          body: JSON.stringify({ highlights, title, summary }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error updating note");

      dispatch(
        noteActions.updateNote({
          id: nid,
          keywords: highlights,
          title,
          summary,
        })
      );
    } catch (err) {
      alert(err);
    }
  };
};

export default noteSlice;
