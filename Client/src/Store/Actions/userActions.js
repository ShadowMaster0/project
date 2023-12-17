export const LOGIN = "login";
export const LOGOUT = "logout";

export const loginUser = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT,
});
