import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;
console.log("REACT_APP_BACKEND_URL: ", backend_url);

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${backend_url}/users/auth/login`, userCredential);
    dispatch({type: "LOGIN_SUCCESS", payload: res.data});
  } catch (err) {
    dispatch({type: "LOGIN_FAIL", payload: err});
  }
}