import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import {join, dirname} from "path";
import {fileURLToPath} from "url";
import {
  catchErrorMiddleware,
  badRequestMiddleware,
  notFoundMiddleware,
} from "./errorMiddleWares.js";
// Importing the routs;
import blogRouter from "./blogs/index.js"; // Router for all the requests related to the blogs;
import filesRouter from "./services/files/index.js"; // Router for uploading of all the files;
import postRouter from "./blogPosts/index.js"; // Router for all the posts related things;
import usersRouter from "./users/index.js";
// Path for the file systems;
const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public"
);

// Initiate and Server details;
const server = express();
const port = process.env.PORT || 3001;

// section for routes and global middlewares;

//Cross Platform Origin verification;
const whitelist = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
  "http://localhost:3001",
  "http://localhost:3000",
];
server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by cors"));
      }
    },
  })
);
console.log(process.env.PORT, ":  Check this port ");

server.use(express());
server.use(cors());
server.use(express.json());

// Server Routes

server.use("/blogs", blogRouter);
server.use("/files", filesRouter);
server.use("/posts", postRouter);
server.use("/users", usersRouter);

//Section for the error middlewares
server.use(notFoundMiddleware);
server.use(badRequestMiddleware);
server.use(catchErrorMiddleware);

// Cloud server
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("Server running on port ", port);
    })
  )
  .catch((err) => console.log(err));

// Listen the server at port 3001;

console.table(listEndpoints(server));
// server.listen(port, () => {
//   console.log("✅Server is running on port: ", port);
// });
// server.on("error", (error) => {
//   console.log("❌ Server is NOT running on the PORT: ", port);
// });
