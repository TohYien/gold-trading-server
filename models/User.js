const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  goldHoldings: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
