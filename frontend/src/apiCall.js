import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/users/auth/login", userCredential);
    dispatch({type: "LOGIN_SUCCESS", payload: res.data});
  } catch (err) {
    dispatch({type: "LOGIN_FAIL", payload: err});
  }
}