import mongoose from 'mongoose';

const connectServer = async () => {
  try {
    const res = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to: ${res.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectServer;
