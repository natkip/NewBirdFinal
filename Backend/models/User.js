const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
});


module.exports = mongoose.model('User', UserSchema);
