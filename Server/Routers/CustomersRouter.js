// Routes/CustomerRoutes.js
const customersBLL = require("../BLL/CustomersBLL");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require("../authMiddleware");
const bcrypt = require("bcrypt");

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.get("/", async (req, res) => {
  try {
    const customers = await customersBLL.getAllCustomers();
    return res.json({ customers });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await customersBLL.getCustomerById(customerId);
    return res.json({ customer });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await customersBLL.loginDB(username);

    if (!user) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(403).json({
        error: "invalid login",
      });
    }

    const payload = {
      id: user._id,
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

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, city, password } = req.body;
    console.log(req.body);
    if (!password) {
      res.status(400).json({ msg: "Password is required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await customersBLL.addNewCustomer(
      name,
      username,
      email,
      city,
      hashedPassword
    );

    res.status(201).json({ msg: "User registered successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
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

router.put("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const data = req.body;
    const message = await customersBLL.updateCustomer(customerId, data);
    return res.status(200).json({ message });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.put("/:customerId/purchases", async (req, res) => {
  try {
    const { customerId } = req.params;
    const purchases = req.body;
    const message = await customersBLL.updatePurchases(customerId, purchases);
    return res.status(200).json({ message });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ msg: "logout successful" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.delete("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const message = await customersBLL.deleteCustomer(customerId);
    return res.status(204).send();
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
