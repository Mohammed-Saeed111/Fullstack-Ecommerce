// const express = require("express");
// const { registerUser, loginUser } = require("../handler/auth-handeler");
// const router = express.Router();
// router.post("/register", async (req, res) => {
//   try {
//     let model = req.body;
//     if (model.name && model.password && model.email) {
//       await registerUser(model);
//       res.status(201).json({ message: "User Registered Successfuly" });
//     } else {
//       throw new Error("provide name,email and password");
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// router.post("/login", async (req, res) => {
//   try {
//     let model = req.body;
//     console.log(model);
//     if (model.password && model.email) {
//       let result = await loginUser(model);
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         throw new Error("Email or password is incorrect");
//       }
//     } else {
//       throw new Error("provide email and password");
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// module.exports = router;


const express = require("express");
const { registerUser, loginUser } = require("../handler/auth-handeler");
const router = express.Router();

// تسجيل المستخدم الجديد
router.post("/register", async (req, res) => {
  try {
    let model = req.body;

    // التحقق من البيانات المرسلة
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

// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    let model = req.body;

    // التحقق من البيانات المرسلة
    if (model.password && model.email) {
      let result = await loginUser(model);

      // إذا كان تسجيل الدخول ناجحًا
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
