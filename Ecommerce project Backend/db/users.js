const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],  
  },
  password: {
    type: String,
    required: true,  
  },
  isAdmin: {
    type: Boolean,
    default: false,  
  },
}, { timestamps: true });  

// إنشاء نموذج المستخدم
const User = mongoose.model("User", userSchema);

module.exports = User;
