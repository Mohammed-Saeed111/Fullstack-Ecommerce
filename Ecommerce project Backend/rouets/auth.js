
const express = require("express");
const { registerUser, loginUser } = require("../handler/auth-handeler");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let model = req.body;

    if (model.name && model.password && model.email) {
      await registerUser(model);
      res.status(201).json({ message: "User Registered Successfully" });
    } else {
      throw new Error("Provide name, email, and password");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let model = req.body;

      let result = await loginUser(model);

      if (result) {
        res.status(200).json(result);
      } else {
        throw new Error("Email or password is incorrect");
      }
    } else {
      throw new Error("Provide email and password");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
