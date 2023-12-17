const axios = require("axios");

const GetAllUsers = async () => {
  const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
  const users = resp.data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
  }));
  return users;
};

module.exports = { GetAllUsers };
