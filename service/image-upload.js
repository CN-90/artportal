import multer from 'multer';
import s3Storage from 'multer-sharp-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, Only JPEG and PNG files are accepted.'));
  }
};

// storage for 200x200 user images.
const iconStorage = s3Storage({
  acl: 'public-read',
  s3,
  Bucket: 'artportalapp',
  resize: { width: 200, height: 200 },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  Key: function (req, file, cb) {
    cb(null, `userIcon/${req.user._id}`);
  },
});

// storage for 1080x1350
const postStorage = s3Storage({
  acl: 'public-read',
  s3,
  Bucket: 'artportalapp',
  resize: { width: 1080, height: 1350 },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  Key: function (req, file, cb) {
    cb(null, `posts/${req.user._id}/${Date.now().toString()}`);
  },
});

const bannerStorage = s3Storage({
  acl: 'public-read',
  s3,
  Bucket: 'artportalapp',
  resize: { width: 1000, height: 700 },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  Key: function (req, file, cb) {
    cb(null, `banner/${req.user._id}`);
  },
});

export const uploadPost = multer({
  fileFilter,
  storage: postStorage,
});

export const uploadUserIcon = multer({
  fileFilter,
  storage: iconStorage,
});

export const uploadUserBanner = multer({
  fileFilter,
  storage: bannerStorage,
});

export const deleteImage = (key) => {
  let params = { Bucket: 'artportalapp', key };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      throw new Error('Error deleting the image.');
    }
    return { message: 'Image deleted', image: data };
  });
};
