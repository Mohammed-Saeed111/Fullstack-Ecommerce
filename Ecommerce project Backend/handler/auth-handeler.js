

const User = require("./../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

async function registerUser(model) {
  const hashedPassword = await bcrypt.hash(model.password, 10);
  let user = new User({
    name: model.name,
    email: model.email,
    password: hashedPassword,
  });
  await user.save();
}

async function loginUser(model) {
  const user = await User.findOne({ email: model.email });
  console.log(user);
  
  if (!user) {
    return null; 
  }
  
  const isMatched = await bcrypt.compare(model.password, user.password);
  
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "defaultSecret", 
      {
        expiresIn: "1h", 
      }
    );

    const { password, ...userWithoutPassword } = user.toObject();
    return { token, user: userWithoutPassword };
  } else {
    return null; 
  }
}

module.exports = { registerUser, loginUser };
