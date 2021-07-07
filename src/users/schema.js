import mongoose from "mongoose";

const {Schema, model} = mongoose;

const usersSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timeStamp: true, // this adds the created at and updated at automatically;
  }
);

export default model("users", usersSchema); // makes sure
// it is bounded to users collection;
