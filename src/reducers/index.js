import { combineReducers } from "redux";
import chat from "./chat";
import auth from "./auth";
import user from "./user";

export default combineReducers({
  chat,
  auth,
  user,
});
