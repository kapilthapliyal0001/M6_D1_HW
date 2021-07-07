import express from "express";
import createError from "http-errors";

//Modal from mongoloose
import UserModal from "./schema.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModal(req.body);
    const {_id} = await newUser.save();
    console.log(newUser);
    res.status(201).send({_id});
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      console.log(error);
      next(createError(500, "An error happened while creating a new user"));
    }
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const collection = await UserModal.find();
    console.log(collection);
    res.send(collection);
  } catch (error) {
    console.log(error);
    next(
      createError(
        500,
        "An error has occured while getting all the list of users...!"
      )
    );
  }
});

export default usersRouter;
