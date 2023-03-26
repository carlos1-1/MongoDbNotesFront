import { INITIAL_GLOBAL_STATE } from "../utils/initialObjects.js";

import {
  GENERAL_NOTES,
  GET_USER,
  ADD_NOTE,
  EDIT_NOTE,
  GET_NOTE,
  IMPORTANT_NOTES,
} from "./actions.js";

function rootReducer(state = INITIAL_GLOBAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        actualUser: action.payload,
      };
    case GENERAL_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case EDIT_NOTE:
      const updatedNote = action.payload;
      const updatedNotes = state.notes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      );

      return {
        ...state,
        notes: updatedNotes,
      };
    case GET_NOTE:
      return {
        ...state,
        actualNote: action.payload,
      };
    case IMPORTANT_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
