import { model, Schema } from 'mongoose';

const UserSchema = Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

module.exports = model('User', UserSchema);
