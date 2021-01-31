import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  replies: [],
});

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
  },
  image: {
    type: { imageUrl: '', key: '' },
    required: true,
  },
  comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
