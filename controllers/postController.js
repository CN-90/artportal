import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';

export const createPost = asyncHandler(async (req, res) => {
  const { description, image } = req.body;
  console.log(image);
  const post = await Post.create({ description, image, user: req.user._id });
  req.user.posts.push(post._id);

  const updatedUser = await req.user.save();
  res.json({
    updatedUser,
    post,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  if (post) {
    res.status(200).json({
      post,
    });
  } else {
    throw new Error('No post was found with that ID.');
  }
});

export const deletePostById = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  let indexOfPost = req.user.posts.indexOf(req.params.id);
  if (indexOfPost > -1) {
    req.user.posts.splice(indexOfPost, 1);
    await req.user.save();
    res.json({
      message: 'Post successfully deleted.',
    });
  } else {
    throw new Error('Could not find post with that ID.');
  }
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate({ path: 'user', model: 'User' })
    .exec();
  if (posts) {
    res.status(200).json({
      posts,
    });
  } else {
    throw new Error('No posts were found.');
  }
});
