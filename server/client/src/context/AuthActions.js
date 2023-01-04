export const loginStart = (userCredential) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user, 
});

export const loginFail = (error) => ({
  type: "LOGIN_FAIL",
  payload: error,
});

// export const Follow = (uid) => ({
//   type: "FOLLOW",
//   payload: uid,
// })

// export const unFollow = (uid) => ({
//   type: "UNFOLLOW",
//   payload: uid,
// })