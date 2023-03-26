import axios from "axios";

export const GET_USER = "GET_USER";
export const GENERAL_NOTES = "GENERAL_NOTES";
export const IMPORTANT_NOTES = "IMPORTANT_NOTES";
export const FINISHED_NOTES = "FINISHED_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const GET_NOTE = "GET_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
const API = "https://mongodbnotesback-production.up.railway.app/users/";

export function getOrCreateUser(email) {
  return async function (dispatch) {
    let json = await axios.get(`${API}email/${email}`);
    return dispatch({
      type: GET_USER,
      payload: json.data,
    });
  };
}

export const createNote = (id, note) => {
  return (dispatch) => {
    axios
      .post(`${API}${id}/notes`, note)
      .then((response) => {
        dispatch({ type: ADD_NOTE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export function getNotFinished(userId, boolean) {
  return async function (dispatch) {
    let json = await axios.get(`${API}${userId}/notes/finished/${boolean}`);

    return dispatch({
      type: GENERAL_NOTES,
      payload: json.data,
    });
  };
}
export function getImportant(userId, boolean) {
  return async function (dispatch) {
    let json = await axios.get(`${API}${userId}/notes/important/${boolean}`);
    return dispatch({
      type: IMPORTANT_NOTES,
      payload: json.data,
    });
  };
}
export const editNote = (userId, noteId, updatedNote) => async (dispatch) => {
  try {
    const res = await axios.put(`${API}${userId}/notes/${noteId}`, updatedNote);
    dispatch({
      type: EDIT_NOTE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNote = (userId, noteId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}${userId}/notes/${noteId}`);
    dispatch({
      type: GET_NOTE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteNote = (userId, noteId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${API}${userId}/notes/${noteId}`);
    dispatch({
      type: DELETE_NOTE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
