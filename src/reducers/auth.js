const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("chatjet_profile", JSON.stringify(action.payload));
      return { ...state, authData: action.payload };

    case "LOGOUT":
      localStorage.removeItem("chatjet_profile");
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default auth;
