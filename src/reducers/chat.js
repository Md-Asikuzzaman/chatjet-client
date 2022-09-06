const chat = (state = [], action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.payload];

    case "FETCH_MESSAGE":
      return action.payload;

    default:
      return state;
  }
};

export default chat;
