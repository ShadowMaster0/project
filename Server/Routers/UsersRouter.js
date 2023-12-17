const UserBLL = require("../BLL/UsersBLL");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require("../authMiddleware");

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.get("/", async (req, res) => {
  try {
    const users = await UserBLL.GetAllUsersWS();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await UserBLL.login(username, email);

    if (!user) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }
    if (user.email !== email) {
      return res.status(403).json({
        error: "invalid login",
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token Secret:", process.env.ACCESS_TOKEN_SECRET);
    console.log("Token Secret refresh:", process.env.REFRESH_TOKEN_SECRET);

    return (
      res
        .cookie("token", accessToken, {
          httpOnly: true,
          secure: true, // ensures the cookie is sent over HTTPS
          sameSite: "strict", // restricts the cookie from being sent to other sites
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        // Send the JWT and user data back to the frontend
        .status(200)
        .json({ accessToken, refreshToken, user })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ msg: "Refresh token not found" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  });
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const id = +req.params.id; // Convert the ID to a number
    const user = await UserBLL.getUserByID(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
