import { model, Schema } from 'mongoose';

const PostSchema = Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
  },
  authorId: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

module.exports = model('Post', PostSchema);
