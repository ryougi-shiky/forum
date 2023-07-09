const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    // case "FOLLOW":
    //   return {
    //     ...state, // take user, isFetching, error and paste here
    //     user: {
    //       ...state.user,
    //       followings: [...state.user.followings, action.payload],
    //     }
    //   };
    // case "UNFOLLOW":
    //   return {
    //     ...state, // take user, isFetching, error and paste here
    //     user: {
    //       ...state.user,
    //       followings: state.user.followings.filter(
    //         (following) => following !== action.payload
    //       ),
    //     }
    //   };

    default:
      return state;
  }
}

export default AuthReducer;