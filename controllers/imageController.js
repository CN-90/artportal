import {
  uploadPost,
  uploadUserIcon,
  uploadUserBanner,
} from './../service/image-upload.js';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';

const singleUploadPost = uploadPost.single('image');
const singleUploadIcon = uploadUserIcon.single('image');
const singleUploadBanner = uploadUserBanner.single('image');

//  Handle uploading normal posts.
export const uploadImage = asyncHandler((req, res) => {
  singleUploadPost(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({ message: 'Image upload error', error: err.message });
    }
    return res.json({ imageUrl: req.file.Location, key: req.file.key });
  });
});

// Handle uploading user Icons images.
export const uploadUserImage = asyncHandler((req, res) => {
  singleUploadIcon(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({ message: 'Error updating user photo.', error: err.message });
    }
    console.log(req.file);
    return res.json({ imageUrl: req.file.Location, key: req.file.key });
  });
});

// Handle uploading user banner images.
export const uploadBanner = asyncHandler((req, res) => {
  singleUploadBanner(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({ message: 'Image upload error', error: err.message });
    }
    return res.json({ imageUrl: req.file.Location, key: req.file.key });
  });
});

export const deleteImage = (req, res) => {};
