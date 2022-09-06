import * as api from "./../api";

export const userSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const userSignUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
