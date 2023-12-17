import { LOGIN, LOGOUT } from "../Actions/userActions";

const initialUserState = {
  user: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.payload;
      console.log(user);
      if (user) {
        return {
          ...state,
          user,
        };
      } else {
        return {
          ...state,
          user: null,
        };
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
