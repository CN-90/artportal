import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateJWT from './../utils/jwt.js';

// Register user
//  POST /api/users
// public

export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with that email.');
  }

  const user = await User.create({ email, username, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      userImage: user.userImage,
      bannerImage: user.bannerImage,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data was entered.');
  }
});

// Login user
// POST /api/users/login
// public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
      bio: user.bio,
      userImage: user.userImage,
      token: generateJWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email or password was invalid.');
  }
});

// Follow a user.
// PUT /api/users/:id/follow
// private

export const followUser = asyncHandler(async (req, res) => {
  const userToFollow = await User.findById({ _id: req.params.id });

  // check to see if the current user is already following that user.
  let foundUser = userToFollow.followers.indexOf(req.user._id);

  if (foundUser < 0) {
    userToFollow.followers.push(req.user._id);
    req.user.following.push(userToFollow._id);
    await userToFollow.save();
    await req.user.save();
    res.status(200).json({
      message: `You are now following ${userToFollow.username}`,
    });
  } else {
    throw new Error(`You are already following ${userToFollow.username}.`);
  }
});

// unfollow a user.
// PUT /api/users/:id/unfollow
// private

export const unfollowUser = asyncHandler(async (req, res) => {
  const userToUnfollow = await User.findById({ _id: req.params.id });

  if (!userToUnfollow) {
    throw new Error('No user was found with that ID.');
  }

  // find the signed in user amongst the users followers and remove them.
  const userIndex = userToUnfollow.followers.indexOf(req.user._id);
  if (userIndex > -1) {
    userToUnfollow.followers.splice(userIndex, 1);
    await userToUnfollow.save();
  }

  // find the user to unfollow amongst the logged in users followees and remove them.
  const userIndexToUnfollow = req.user.following.indexOf(req.params.id);
  if (userIndexToUnfollow > -1) {
    req.user.following.splice(userIndexToUnfollow, 1);
    await req.user.save();
  }

  res
    .status(200)
    .json({ message: `You have unfollowed ${userToUnfollow.username}` });
});

// Get User Information
// GET /api/users/:id
// PUBLIC

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id })
    .populate({ path: 'posts', model: 'Post' })
    .exec();

  if (user) {
    res.status(200).json({
      username: user.username,
      followers: user.followers,
      following: user.following,
      bio: user.bio,
      posts: user.posts,
      userImage: user.userImage,
      bannerImage: user.bannerImage,
    });
  } else {
    throw new Error('Sorry, User could not be found.');
  }
});

// Update user Information
// PUT /api/users/:id
// PRIVATE

export const updateUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({
    user,
  });
});
