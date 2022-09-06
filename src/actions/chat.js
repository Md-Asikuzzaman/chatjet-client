import * as api from "../api";

export const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({ type: "FETCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = (formData) => async (dispatch) => {
  try {
    const { data } = await api.sendMessage(formData);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessage = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMessage();
    dispatch({ type: "FETCH_MESSAGE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
