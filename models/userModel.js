import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    minlength: [8, 'Password must be 8 characters or more.'],
  },
  userImage: {
    imageUrl: {
      type: String,
      default:
        'https://artportalapp.s3-us-west-1.amazonaws.com/img_placeholder.png',
    },
    key: {
      type: String,
    },
  },
  bannerImage: {
    imageUrl: {
      type: String,
    },
    key: {
      type: String,
    },
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  bio: {
    type: String,
    maxLength: [255, 'Bio Cannot be more than 255 characters.'],
    default: '',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

usersSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSaltSync(10);
  user.password = await bcryptjs.hash(this.password, salt);
});

usersSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', usersSchema);

export default User;
