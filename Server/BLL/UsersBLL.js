const UsersWsBLL = require("../DAL/UserWS");

const GetAllUsersWS = async () => {
  const users = await UsersWsBLL.GetAllUsers();
  return users;
};

const getUserByID = async (id) => {
  const users = await GetAllUsersWS();
  return users.find((user) => user.id === id);
};

const login = async (username, email) => {
  const users = await UsersWsBLL.GetAllUsers();
  const user = users.find(
    (user) => user.username === username && user.email === email
  );
  if (!user) {
    throw new Error("Admin not found");
  }
  return user;
};

module.exports = { login, GetAllUsersWS, getUserByID };
